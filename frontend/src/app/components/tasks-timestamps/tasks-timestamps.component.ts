import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Task} from "../../models/task";
import {User} from "../../models/user";
import {FormControl} from "@angular/forms";
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


  dateStart: Date | null = null;
  dateEnd: Date | null = null;


  editMode: boolean = false;
  taskEditingID: string = "";


  constructor(
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

  edit(taskID: string) {
    this.editMode = true;
    this.taskEditingID = taskID;
  }

  save() {
    if (this.dateStart == null) {
      return;
    }

    if (this.dateEnd == null) {
      return;
    }

    if (!this.afterNowFilter(this.dateStart)) {
      return;
    }

    if (!this.afterStartFilter(this.dateEnd)) {
      return;
    }

    let tsStart = this.dateStart.getTime();
    let tsEnd = this.dateEnd.getTime();


    this.taskService.setTimestampsTask(this.taskEditingID, tsStart, tsEnd)
      .subscribe((task) => {
        this.tasks[this.tasks.map(t => t._id).indexOf(task._id)] = task;
        this.table.renderRows();
        this.editMode = false;
        this.taskEditingID = "";
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

    return d!=null && this.dateStart!=null && d.getTime() > this.dateStart.getTime();
  };

}
