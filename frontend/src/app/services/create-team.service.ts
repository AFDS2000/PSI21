import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { Team } from '../models/team';


@Injectable({
    providedIn: 'root'
})
export class CreateTeamService {


    private url = 'http://localhost:3021/team';


    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
    ) { }


    addTeam(criarEquipa: Team): Observable<{ errors: string }> {
        const url_criarEquipa = `${this.url}/criarEquipa`
        return this.http.post<any>(url_criarEquipa, criarEquipa, this.httpOptions).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<{ errors: string }>('addTeam'))
        );
    }
}
