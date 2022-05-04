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
      tap(_ => this.log('fetched tasks')),
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  private tasksUrl = 'http://localhost:3021/task';
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>('addTask'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`TaskService: ${message}`);
  }

  constructor(private http: HttpClient) { }
}
