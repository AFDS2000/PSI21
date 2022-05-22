import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';

import { Task } from '../models/task';
import { ErrorHandlerService } from './error-handler.service';
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    //    private url = 'http://appserver.alunos.di.fc.ul.pt:3021/task';
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

    editUsersTask(id: string, users: string[]): Observable<Task> {
        const url_edit = `${this.url}/edit-users/${id}`;

        return this.http.post<Task>(url_edit, users, this.httpOptions).pipe(
            catchError(this.errorHandlerService.handleError<Task>('editUsersTask'))
        );
    }
    editPercentageTask(task: Task): Observable<Task> {
        const url_edit = `${this.url}/update-percentage`;

        return this.http.post<Task>(url_edit, task, this.httpOptions).pipe(
            catchError(this.errorHandlerService.handleError<Task>('editPercentageTask'))
        );
    }

    setTimestampsTask(id: string, tsStart: number, tsEnd: number): Observable<Task> {
        const url_edit = `${this.url}/set-timestamps/${id}`;

        return this.http.post<Task>(url_edit, { tsStart, tsEnd }, this.httpOptions).pipe(
            catchError(this.errorHandlerService.handleError<Task>('setTimestampsTask'))
        );
    }
}
