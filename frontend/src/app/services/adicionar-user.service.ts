import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, first, Observable } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';
import { Team } from '../models/team';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AdicionarUserService {

  private url = 'http://localhost:3021/consultar/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,) { }
   
    addUser(team: Team): Observable<Team> {
      return this.http.put<Team>(this.url, team, this.httpOptions).pipe(first(), catchError(this.errorHandlerService.handleError<Team>('addUser')));
    }
}
