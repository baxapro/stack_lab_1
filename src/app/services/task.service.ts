import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(title: string, description: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, { title, description });
  }


  markTaskAsCompleted(id: string): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Task>(url, {});

  }

  deleteTask(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
