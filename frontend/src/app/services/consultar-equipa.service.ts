import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError, find, first, tap} from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { Team } from '../models/team';


@Injectable({
  providedIn: 'root'
})
export class ConsultarEquipaService {

  private url = 'http://localhost:3021/consultar/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,) { }
  
  
  
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url).pipe(
      first(), catchError(this.errorHandlerService.handleError<Team[]>('getTeams')));
  }


}
