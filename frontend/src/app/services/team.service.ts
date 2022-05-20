import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, first, catchError } from 'rxjs';

import { Team } from '../models/team';
import { ErrorHandlerService } from './error-handler.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

//    private url = 'http://appserver.alunos.di.fc.ul.pt:3021/team';
private url = 'http://localhost:3021/team';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
    ) { }

    getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(this.url).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<Team[]>('getTeams'))
        );
    }

    getTeam(id: String): Observable<Team> {
        const url_team = `${this.url}/${id}`
        return this.http.get<Team>(url_team).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<Team>('getTeam'))
        );
    }

    addTeam(team: Team): Observable<Team> {
        const url_add = `${this.url}/criarEquipa`;
        return this.http.post<Team>(url_add, team, this.httpOptions).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<Team>('addTeam'))
        );
    }

    addUser(team: Team, user: User): Observable<Team> {
        return this.http.put<Team>(this.url, { team, user }, this.httpOptions).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<Team>('addUser'))
        );
    }

    deleteUser(team: Team) {
        const url_delete = `${this.url}/deleteUser`
        return this.http.put<Team>(url_delete, team, this.httpOptions).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<Team>('addUser'))
        );
    }
}
