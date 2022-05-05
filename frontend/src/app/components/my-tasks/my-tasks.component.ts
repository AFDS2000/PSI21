import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-my-tasks',
    templateUrl: './my-tasks.component.html',
    styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
    displayedColumns: string[] = ['name', 'level', 'percentageConclusion'];
    tasks: Task[] = [];

    constructor(
        private tasksService: TaskService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.getTasks();
    }

    getTasks(): void {
        if (this.authService.userId != null)
            this.tasksService.getTasksUser(this.authService.userId)
                .subscribe((tasks) => this.tasks = tasks);
    }
}
