import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tarefa-percentagem',
  templateUrl: './tarefa-percentagem.component.html',
  styleUrls: ['./tarefa-percentagem.component.scss']
})
export class TarefaPercentagemComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  tasks: Task[] = [];
  displayedColumns: string[] = ['name', 'level', 'percentageConclusion', 'edit'];
  editMode: boolean = false;
  tasksEditing = new FormControl("",[Validators.max(100), Validators.min(0),Validators.required]);
  tasksOnlyNameMap = (t: Task): string => t.name
  tasksMap: Map<string, Task> = new Map<string, Task>();
  task!:Task;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(): void {
    this.taskService.getTasks()
        .subscribe(tasks => {
            this.tasks = tasks;
            this.tasks.forEach(task => {
                this.tasksMap.set(task._id, task);
            })
            this.table.renderRows();
        });
}
  edit(taskID: string):void {
    this.editMode=true;
    this.task = this.tasksMap.get(taskID)!;
    this.tasksEditing.setValue(this.task.percentageConclusion);
  }
  save():void {
    if(this.tasksEditing.valid){
      this.task.percentageConclusion = this.tasksEditing.value;
      this.taskService.editPercentageTask(this.task).subscribe(() => {
        this.getTasks();
      })
    }
    this.editMode=false;
  }
}
