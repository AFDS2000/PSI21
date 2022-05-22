import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { catchError, first, Observable } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';
import { Reuniao } from '../models/reuniao';


@Injectable({
  providedIn: 'root'
})
export class ReuniaoService {

  private url = 'http://appserver.alunos.di.fc.ul.pt:3021/reuniao';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getReuniaoUser(id: string) {
    const url_reuniaoUser = `${this.url}/${id}`
    return this.http.get<Reuniao[]>(url_reuniaoUser)
      .pipe(
        catchError(this.errorHandlerService.handleError<Reuniao[]>('getReuniaoUser', []))
      );
  }

  addReuniao(criarReuniao: Reuniao): Observable<Reuniao> {
    const url_criarReuniao = `${this.url}/criarReuniao`
    return this.http.post<Reuniao>(url_criarReuniao, criarReuniao, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Reuniao>('addReuniao'))
    );
  }

}
