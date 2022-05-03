import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/user';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'http://localhost:3021/auth/';

    isUserLoogedIn$ = new BehaviorSubject<boolean>(false);
    userType!: Pick<User, "type">;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient, 
        private errorHandlerService: ErrorHandlerService,
        private router: Router    
    ) { }

    signup(user: Omit<User, "_id">): Observable<User> {
        const url_signup = this.url + 'signup';
        return this.http.post<User>(url_signup, user, this.httpOptions).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<User>("signup"))
        )
    }

    login(name: Pick<User, "name">, password: Pick<User, "password">): Observable<{
        token: string; type: Pick<User, "type">
    }> {
        const url_login = this.url + 'login';
        return this.http.post<any>(url_login, { name, password }, this.httpOptions).pipe(
            first(),
            tap((tokenObject: { token: string; type: Pick<User, "type"> }) => {
                this.userType = tokenObject.type;
                localStorage.setItem("token", tokenObject.token);
                this.isUserLoogedIn$.next(true);
                this.router.navigate(["signup"])
            }),
            catchError(this.errorHandlerService.handleError<{
                token: string; type: Pick<User, "type">
            }> ("login"))
        )

    }
}
