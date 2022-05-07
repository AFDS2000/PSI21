import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { catchError, Observable, of, tap } from 'rxjs';

import { Task } from '../models/task';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private url = 'http://localhost:3021/task';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }

    getTasks() {
        return this.http.get<Task[]>(this.url)
            .pipe(
                catchError(this.errorHandlerService.handleError<Task[]>('getTasks', []))
            );
    }

    getTasksUser(id: string) {
        const url_tasksUser = `${this.url}/${id}`
        return this.http.get<Task[]>(url_tasksUser)
            .pipe(
                catchError(this.errorHandlerService.handleError<Task[]>('getTasks', []))
            );
    }

    addTask(task: Task): Observable<Task> {
        const url_add = `${this.url}/add`;
        return this.http.post<Task>(url_add, task, this.httpOptions).pipe(
            catchError(this.errorHandlerService.handleError<Task>('addTask'))
        );
    }

    deleteTask(id: string): Observable<Task> {
        const url_delete = `${this.url}/delete/${id}`;

        return this.http.delete<Task>(url_delete, this.httpOptions).pipe(
            catchError(this.errorHandlerService.handleError<Task>('deleteTask'))
        );
    }
}
