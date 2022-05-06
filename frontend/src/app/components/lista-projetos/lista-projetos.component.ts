import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';

import { CriarProjetoService } from 'src/app/services/criar-projeto.service'; 
import { TaskService } from 'src/app/services/task.service';

import {Project} from '../../models/project';



@Component({
  selector: 'app-lista-projetos',
  templateUrl: './lista-projetos.component.html',
  styleUrls: ['./lista-projetos.component.scss']
})
export class ListaProjetosComponent implements OnInit {
  viewForm!: FormGroup;
  associarTask!: FormGroup;
  desassociarTask!: FormGroup;
  projects: Project[] = [];
  project!: Project;
  tasks: Task[] = [];
  tasksAdd: Task[] = [];
  tasksRemove: Task[] = [];
 

  constructor(private criarProjetoService : CriarProjetoService, private taskService : TaskService) { }

  ngOnInit(): void {
    this.viewForm = this.createFormGroup();
    this.desassociarTask = this.createFormGroupDelete();
    this.associarTask = this.createFormGroupAdd();
    this.getProjects();
    this.getTasks();
  }
 

createFormGroup(): FormGroup {
  return new FormGroup({
    projeto: new FormControl('',[Validators.required]),
});
}

createFormGroupAdd(): FormGroup {
  return new FormGroup({
    task: new FormControl('',[Validators.required]),
});
}

createFormGroupDelete(): FormGroup {
  return new FormGroup({
    task: new FormControl('',[Validators.required]),
});
}

getProjects(): void {
  this.criarProjetoService.getProjects()
      .subscribe(projects => this.projects = projects);
}

updateTasks(): void{
  
  this.project = this.viewForm.value.projeto;
  if(this.project.tasks!=null){
    for(var i =0;i< this.tasks.length;i++){
      this.tasksRemove.push(this.tasks[i]);
      this.tasksAdd.push(this.tasks[i]);
        for(var j =0;j<this.project.tasks.length;j++){
          if(this.project.tasks[j]==this.tasks[j]._id){

            }
        }
    }
  }


  console.log(this.tasksRemove)

}

associar(): void{

}

desassociar(): void{

}

getTasks(): void{
  this.taskService.getTasks()
  .subscribe(tasks => this.tasks = tasks);
}

}