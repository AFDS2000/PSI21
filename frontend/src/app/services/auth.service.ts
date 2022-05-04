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
    userId!: string | null;
    userType!: string | null;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient, 
        private errorHandlerService: ErrorHandlerService,
        private router: Router  
    ) { 
        if (localStorage.getItem("token")) {
            this.isUserLoogedIn$.next(true);
        }

        if (localStorage.getItem("userType")) {
            this.userType = localStorage.getItem("userType");
        }

        if (localStorage.getItem("userId")) {
            this.userId
            =localStorage.getItem("userId");
        }

    }

    signup(user: Omit<User, "_id">): Observable<User> {
        const url_signup = this.url + 'signup';
        return this.http.post<User>(url_signup, user, this.httpOptions).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<User>("signup"))
        )
    }

    login(name: Pick<User, "name">, password: Pick<User, "password">): Observable<{
        token: string; type: string
    }> {
        const url_login = this.url + 'login';
        return this.http.post<any>(url_login, { name, password }, this.httpOptions).pipe(
            first(),
            tap((tokenObject: { token: string; id: string; type: string }) => {
                this.userId = tokenObject.id;
                this.userType = tokenObject.type;
                
                localStorage.setItem("token", tokenObject.token);
                localStorage.setItem("userId", this.userId);
                localStorage.setItem("userType", this.userType);
                
                this.isUserLoogedIn$.next(true);
                this.router.navigate(["criarUtilizador"])
            }),
            catchError(this.errorHandlerService.handleError<{
                token: string; type: string
            }> ("login"))
        )

    }
}
