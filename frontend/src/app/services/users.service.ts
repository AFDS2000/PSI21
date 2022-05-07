import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { catchError, Observable, of, tap } from 'rxjs';

import { Task } from '../models/task';
import { ErrorHandlerService } from './error-handler.service';
import {User} from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private url = 'http://localhost:3021/users';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }

    getUsers() {
        return this.http.get<User[]>(this.url)
            .pipe(
                catchError(this.errorHandlerService.handleError<User[]>('getUsers', []))
            );
    }


}
