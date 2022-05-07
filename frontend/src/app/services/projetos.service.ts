import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { Team } from '../models/team';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class ProjetosService {

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }
    private urlProjet = 'http://localhost:3021/projects';
    private urlTeam = 'http://localhost:3021/team';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getProjects() {
        return this.http.get<Project[]>(this.urlProjet)
            .pipe(
                catchError(this.errorHandlerService.handleError<Project[]>('getProjects', []))
            );
    }

    getTeams() {
        return this.http.get<Team[]>(this.urlTeam)
            .pipe(
                catchError(this.errorHandlerService.handleError<Team[]>('getTeams', []))
            );
    }
    updateTeam(project: Project): Observable<Project> {
        return this.http.put<Project>(this.urlProjet, project, this.httpOptions)
            .pipe(
                catchError(this.errorHandlerService.handleError<Project>('getProjects'))
            );
    }

    updateTasks(project: Project): Observable<Project> {
        const url_add = `${this.urlProjet}/tasks`;
        return this.http.put<Project>(url_add, project, this.httpOptions)
            .pipe(
                catchError(this.errorHandlerService.handleError<Project>('getProjects'))
            );
    }

}
