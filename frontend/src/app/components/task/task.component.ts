import { Component, Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
    tasks: Task[] = [];
    matcher!: MyErrorStateMatcher;
    nameFormControl!: FormControl;
    levelFormControl!: FormControl;
    levels: Level[] = [
        { value: '' },
        { value: 'urgente' },
        { value: 'alta' },
        { value: 'média' },
        { value: 'baixa' }
    ];
    constructor(private taskService: TaskService, private authService: AuthService) { }

    ngOnInit(): void {
        this.levelFormControl = new FormControl('', [Validators.required, Validators.nullValidator]);
        this.nameFormControl = new FormControl('', [Validators.minLength(4), Validators.required, Validators.nullValidator]);
        this.matcher = new MyErrorStateMatcher();
        this.getTasks();
    }

    Submit(name: string, level: string, percentageConclusion = 0, users = [""]): void {
        if (this.levelFormControl.status != 'INVALID' && this.nameFormControl.status != 'INVALID' && this.authService.userId != null) {
            name = name.trim();
            users = [this.authService.userId];
            if (!name) { return; }
            this.taskService.addTask({ name, level, percentageConclusion, users } as Task)
                .subscribe(task => {
                    this.tasks.push(task);
                });

        }
    }
    Delete(task: Task): void {

        this.tasks = this.tasks.filter(h => h !== task);
        this.taskService.deleteTask(task._id).subscribe();
    }
    getTasks(): void {
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
    }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
