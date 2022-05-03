import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

//import { catchError, Observable, tap } from 'rxjs';
import { Project } from '../models/project';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CriarProjetoService {

  private url = 'http://localhost:3021/criarProjeto/';

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
      tap((newCriarProjeto: Project) => this.log(`added project name w/ id=${newCriarProjeto._id}`)),
      catchError(this.errorHandlerService.handleError<Project>('addProject'))
    );
  }

  log(arg0: string): void {
    throw new Error('Method not implemented.');
  }


  /** Log a HeroService message with the MessageService */


}
