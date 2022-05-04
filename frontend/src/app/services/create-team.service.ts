import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError, first} from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { Team } from '../models/team';


@Injectable({
  providedIn: 'root'
})
export class CreateTeamService {

  private url = 'http://localhost:3021/criarEquipa/';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
  ) {}

  
  addTeam(criarEquipa: Team): Observable<Team> {
    return this.http.post<Team>(this.url, criarEquipa, this.httpOptions).pipe(
      first(), catchError(this.errorHandlerService.handleError<Team>('addTeam')));
  } 
}
