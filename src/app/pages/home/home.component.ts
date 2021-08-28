/**
 * Title: home.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 28 August 2021
 * Description: This is the home component ts file.
 */

//This is our import statements for this component.
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface'
import { TaskService } from '../../shared/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//Here we export the home component.
export class HomeComponent implements OnInit {

  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    //This makes a call to the find all task API.

    this.taskService.findAllTasks(this.empId).subscribe(res => {

      //This is our logging which shows that we should receive a response in the form of an employee object.
      console.log('--Server response from findAllTasks API--');
      console.log(res);

      this.employee = res;
      console.log('--Employee object--');
      console.log(this.employee);
    }, err => {

      //This is our error logging.
      console.log('--Server error--');
      console.log(err);
    }, () => {

      //This is the on complete action which means once the employee record is found then we return the todo and done list.
      console.log('--onComplete of the findAllTasks service call--')
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('--Todo task--');
      console.log(this.todo);

      console.log('--Done tasks--');
      console.log(this.done);
    })
  }

  ngOnInit(): void {
  }

  //This creates our Create Task Dialog box.
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    //This creates the after closed function to return the data.
    dialogRef.afterClosed().subscribe(data => {
      if (data)
      {
        //This uses the create task function to create the task.
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          //This is logging for error handling.
          console.log('--OnError of the createTask service call--');
          console.log(err);
        }, () =>{
          //This is on complete of the createTask function then we return the todo and done updated list.
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

}
