import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    viewForm!: FormGroup;
    associarTask!: FormGroup;
    desassociarTask!: FormGroup;
    projects: Project[] = [];
    project!: Project;
    tasks: Task[] = [];
    tasksAdd: Task[] = [];
    tasksRemove: Task[] = [];

    constructor(private projetosService: ProjetosService, private taskService: TaskService) { }

    ngOnInit(): void {
        this.viewForm = this.createFormGroup();
        this.desassociarTask = this.createFormGroupDelete();
        this.associarTask = this.createFormGroupAdd();
        this.getProjects();
        this.getTasks();
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            projeto: new FormControl('', [Validators.required]),
        });
    }

    createFormGroupAdd(): FormGroup {
        return new FormGroup({
            task: new FormControl('', [Validators.required]),
        });
    }

    createFormGroupDelete(): FormGroup {
        return new FormGroup({
            task: new FormControl('', [Validators.required]),
        });
    }

    getProjects(): void {
        this.projetosService.getProjects()
            .subscribe(projects => this.projects = projects);
    }

    updateTasks(): void {
        this.tasksRemove = [];
        this.tasksAdd = [];
        this.project = this.viewForm.value.projeto;
        if (this.project.tasks != null) {
            for (var i = 0; i < this.tasks.length; i++) {
                var existeOutro = false;
                for (var j = 0; j < this.projects.length; j++) {
                    if (this.projects[j].tasks!.includes(this.tasks[i]._id) && this.projects[j]._id != this.project._id) {
                        existeOutro = true;
                    }
                }
                if (!existeOutro) {
                    if (this.project.tasks.includes(this.tasks[i]._id)) {
                        this.tasksRemove.push(this.tasks[i]);
                    } else {
                        this.tasksAdd.push(this.tasks[i])
                    }
                }
            }
        }
        this.tasks = [];
        this.getTasks();
    }

    associar(): void {
        if (this.project.tasks) {
            this.project.tasks.push(this.associarTask.value.task);
        } else {
            this.project.tasks = [this.associarTask.value.task];
        }
        this.projetosService.updateTasks(this.project)
            .subscribe(() => {
                this.getProjects();
            });
        this.updateTasks();
    }

    desassociar(): void {

        this.project.tasks = [];
        for (var i = 0; i < this.tasksRemove.length; i++) {
            if (this.tasksRemove[i]._id != this.desassociarTask.value.task._id) {
                this.project.tasks.push(this.tasksRemove[i]._id)
            }
        }
        this.projetosService.updateTasks(this.project)
            .subscribe(() => {
                this.getProjects();
            });
        this.updateTasks();

    }

    getTasks(): void {
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
    }
}