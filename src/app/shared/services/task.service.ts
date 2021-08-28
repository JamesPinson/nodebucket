/**
 * Title: task.service.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 28 August 2021
 * Description: This is the task service file which we create for reusability.
 */

//This is the import statements.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
