/**
 * Title: home.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 21 August 2021
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

    //Make a call to taskService function findAllTasks

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Server response from findAllTasks API--');
      console.log(res);

      this.employee = res;
      console.log('--Employee object--');
      console.log(this.employee);
    }, err => {
      console.log('--Server error--');
      console.log(err);
    }, () => {
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

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data)
      {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log('--OnError of the createTask service call--');
          console.log(err);
        }, () =>{
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

}
