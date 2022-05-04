import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Task } from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  deleteTask(id: string): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }
  getTasks() {
    var url = 'http://localhost:3021/task/all'
    return this.http.get<Task[]>(url)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Task[]>('getHeroes', []))
    );
  }

  private tasksUrl = 'http://localhost:3021/task';
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>('addHero'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }

  constructor(private http: HttpClient) { }
}
