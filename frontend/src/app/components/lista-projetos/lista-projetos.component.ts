import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Task } from 'src/app/models/task';

import { ProjetosService } from 'src/app/services/projetos.service';
import { TaskService } from 'src/app/services/task.service';

import { Project } from '../../models/project';

@Component({
    selector: 'app-lista-projetos',
    templateUrl: './lista-projetos.component.html',
    styleUrls: ['./lista-projetos.component.scss']
})
export class ListaProjetosComponent implements OnInit {
    @ViewChild(MatTable) table!: MatTable<any>;
    projects: Project[] = [];
    tasksMap: Map<string, Task> = new Map<string, Task>();
    projectsMap: Map<string, Project> = new Map<string, Project>();
    tasks: Task[] = [];
    displayedColumns: string[] = ['name', 'alias', 'tasks', 'edit'];
    editMode: boolean = false;
    tasksEditing = new FormControl();
    tasksOnlyNameMap = (t: Task): string => t.name
    project!: Project;

    constructor(private projetosService: ProjetosService, private taskService: TaskService) { }

    ngOnInit(): void {
        this.getTasks();
        this.getProjects(); 
    }

    getProjects(): void {
        this.projetosService.getProjects()
            .subscribe(projects => {
                this.projects = projects;
                this.projects.forEach(project => {
                    this.projectsMap.set(project._id, project);
                })
                this.table.renderRows();
            });
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

    edit(projectID: string):void {
        this.editMode = true;
        var tasksMapTemp = new Map<string, Task>(this.tasksMap);
        var listaTasks = [];
        for( var i = 0; i<this.projects.length;i++){
            if(this.projects[i].tasks!=null){
                for( var j =0; j< this.projects[i].tasks?.length!;j++){
                    if(tasksMapTemp.has(this.projects[i].tasks![j]) && this.projects[i]._id != projectID){
                        tasksMapTemp.delete(this.projects[i].tasks![j]);
                    }
                    if(tasksMapTemp.has(this.projects[i].tasks![j]) && this.projects[i]._id == projectID){
                        listaTasks.push( tasksMapTemp.get(this.projects[i].tasks![j] ));
                    }
                }
            }
        }
        this.project = this.projectsMap.get(projectID)!;
        this.tasksEditing.setValue( listaTasks )
        this.tasks = Array.from( tasksMapTemp.values() );
    }

    save():void {
        this.project.tasks = this.tasksEditing.value;
        this.projetosService.updateTasks(this.project)
        .subscribe(() => {
            this.getProjects();
            this.editMode=false;
        });
    }
}