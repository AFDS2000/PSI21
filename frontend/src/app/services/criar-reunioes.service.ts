import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { catchError, first, Observable } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';
import { Reuniao } from '../models/reuniao';


@Injectable({
  providedIn: 'root'
})
export class CriarReunioesService {
 

//    private url = 'http://appserver.alunos.di.fc.ul.pt:3021/task';
private url = 'http://localhost:3021/reuniao/criarReuniao';

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }


addReuniao(criarReuniao: Reuniao): Observable<Reuniao> {
  return this.http.post<Reuniao>(this.url, criarReuniao, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Reuniao>('addReuniao'))
  );
}

}
