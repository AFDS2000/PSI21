import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { AuthService } from 'src/app/services/auth.service';

interface Level {
    value: string;
}

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    @ViewChild('formDirective') formDirective!: NgForm;
    tasks: Task[] = [];
    createForm!: FormGroup;
    deleteForm!: FormGroup;
    levels: Level[] = [
        { value: '' },
        { value: 'urgente' },
        { value: 'alta' },
        { value: 'média' },
        { value: 'baixa' }
    ];

    constructor(private taskService: TaskService, private authService: AuthService) { }

    ngOnInit(): void {
        this.createForm = this.createFormGroup();
        this.deleteForm = this.deleteFormGroup();
        this.getTasks();
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl('', [Validators.minLength(4), Validators.required, Validators.nullValidator]),
            level: new FormControl(null, [Validators.required, Validators.nullValidator])
        });
    }

    deleteFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl('', [Validators.required])
        });
    }


    submit(): void {
        const name = this.createForm.value.name;
        const level = this.createForm.value.level;
        const percentageConclusion = 0;
        const users = [this.authService.userId];

        this.taskService.addTask(
            {
                name,
                level,
                percentageConclusion,
                users

            } as Task)
            .subscribe(() => {
                this.getTasks();
            });

        this.createForm.reset();
        this.formDirective.resetForm();

    }

    getTasks(): void {
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
    }

    delete(): void {
        this.taskService.deleteTask(this.deleteForm.value.name._id).subscribe(() => {
            this.getTasks();
        });

        this.deleteForm.reset();
        this.formDirective.resetForm();
    }
}

