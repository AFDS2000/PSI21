import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, first, Observable, tap } from 'rxjs';
import { Project } from '../models/project';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class CriarProjetoService {


    private url = 'http://localhost:3021/projects/criarProjeto/';
    private url2 = 'http://localhost/projects/listaProjetos/';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
        private router: Router
    ) {
    }

    /** POST: add a new project name to the server */
    addProject(criarProjeto: Project): Observable<Project> {
        return this.http.post<Project>(this.url, criarProjeto, this.httpOptions).pipe(
            first(),
            catchError(this.errorHandlerService.handleError<Project>('addProject'))
        );
    }
    /**GET: get projects */
    getProjects() {
        return this.http.get<Project[]>(this.url2)
            .pipe(
                catchError(this.errorHandlerService.handleError<Project[]>('getProjects', []))
            );
    }


}
