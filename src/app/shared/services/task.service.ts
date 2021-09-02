/**
 * Title: task.service.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 1 September 2021
 * Description: This is the task service file which we create for reusability.
 */

//This is the import statements.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})

//This exports the task service to the rest of the app.
export class TaskService {

  //Here we specify the imports we need.
  constructor(private http: HttpClient) { }

  //This creates our find all task function which does a get call to our findAllTasks API.
  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  //This creates the createTask function which does a post call to our CreateTask API.
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    })
  }

  //This is the updateTask functions which calls our updateTask API.
  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }

  //This is the deleteTask function which calls our deleteTask API.
  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
