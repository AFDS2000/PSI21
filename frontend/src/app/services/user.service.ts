import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { User } from '../models/user';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url = 'http://localhost:3021/user';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
    ) { }

    getUser(id: string): Observable<User> {
        const url_user = `${this.url}/${id}`;
        return this.http.get<User>(url_user).pipe(
            catchError(this.errorHandlerService.handleError<User>('getUser'))
        );
    }

    searchUsers(term: string): Observable<User[]> {
        const url_search = `${this.url}/searchUsers?name=${term}`;
        return this.http.get<User[]>(url_search).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<User[]>('searchUsers'))
        );
    }
}