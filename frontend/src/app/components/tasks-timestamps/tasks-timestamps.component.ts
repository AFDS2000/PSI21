import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Task} from "../../models/task";
import {User} from "../../models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-tasks-timestamps',
  templateUrl: './tasks-timestamps.component.html',
  styleUrls: ['./tasks-timestamps.component.scss']
})
export class TasksTimestampsComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  tasks: Task[] = [];
  displayedColumns: string[] = ['name', 'level', 'percentageConclusion', 'tsStart', 'tsEnd', 'edit'];

  datesForm = this.formBuilder.group({
    dateStart: ['', Validators.required],
    dateEnd: ['', [Validators.required]]
  });

  dateStart: Date | null = null;
  dateEnd: Date | null = null;


  editMode: boolean = false;
  taskEditing: Task | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        this.table.renderRows();
      });
  }

  edit(task: Task) {
    this.editMode = true;
    this.taskEditing = task;

    this.dateStart = new Date(task.tsStart);
    this.dateEnd = new Date(task.tsEnd);

    this.datesForm.get("dateStart")?.setValue(this.dateStart);
    this.datesForm.get("dateEnd")?.setValue(this.dateEnd);
  }

  save() {
    if (this.taskEditing == null) {
      return;
    }

    if (this.dateStart == null) {
      return;
    }

    if (this.dateEnd == null) {
      return;
    }

    if (!this.afterNowFilter(this.dateStart)) {
      this.datesForm.get("dateStart")?.setErrors({"matDatepickerFilter": true});
      return;
    }

    if (!this.afterStartFilter(this.dateEnd)) {
      this.datesForm.get("dateEnd")?.setErrors({"matDatepickerFilter": true});
      return;
    }

    if (!this.doesntOverlapUrgent()) {
      this.datesForm.setErrors({"overlap": true});
      return;
    }

    let tsStart = this.dateStart.getTime();
    let tsEnd = this.dateEnd.getTime();


    this.taskService.setTimestampsTask(this.taskEditing._id, tsStart, tsEnd)
      .subscribe((task) => {
        this.tasks[this.tasks.map(t => t._id).indexOf(task._id)] = task;
        this.table.renderRows();
        this.editMode = false;
        this.taskEditing = null;
      });
  }

  toDateString(ts: number) {
    let date = new Date(ts);
    return !isNaN(date.getDate()) ? date.toLocaleDateString() : "";
  }

  afterNowFilter = (d: Date | null): boolean => {

    let nowDate = new Date();
    nowDate.setHours(0,0,0,0);

    return d!=null && d.getTime() >= nowDate.getTime();
  };

  afterStartFilter = (d: Date | null): boolean => {
    if (this.dateStart==null) return true;
    return d!=null && d.getTime() > this.dateStart.getTime();
  };

  doesntOverlapUrgent = (): boolean => {
    if (this.dateStart==null || this.dateEnd==null || this.taskEditing==null) return true;

    let currentTask: Task = this.taskEditing;


    if (currentTask.level == "urgente" && currentTask.percentageConclusion != 100) {
      for (let task of this.tasks) {
        if (task.level != "urgente" || task.percentageConclusion == 100) continue;
        if (currentTask._id == task._id) continue;

          if (currentTask.users.filter(item1 => task.users.some(item2 => item1 === item2)).length != 0) {
          if ((this.dateStart.getTime() <= task.tsStart && task.tsStart <= this.dateEnd.getTime()) ||
              (this.dateStart.getTime() <= task.tsEnd && task.tsEnd <= this.dateEnd.getTime()) ||
              (task.tsStart <= this.dateStart.getTime() && this.dateStart.getTime() <= task.tsEnd) ||
              (task.tsStart <= this.dateEnd.getTime() && this.dateEnd.getTime() <= task.tsEnd)){
            return false;
          }
        }
      }
    }
    return true;
  };

}
