/**
 * Title: home.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 1 September 2021
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
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  //This is our drop function which triggers the drag/drop event.
  drop(event: CdkDragDrop<any[]>) {

    //If the item we are moving is in the same container this we use the moveItemInArray function to re-order the item.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('Reordered the existing list of task items.');

      //We use our updateTaskList function to update the new task list and save it.
      this.updateTaskList(this.empId, this.todo, this.done);

    } else
    {
      //We use the transferArrayItem function if we are moving the item to another container.
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      console.log('Moved task item into the other list.')

      //We use the updateTaskList function to update the todo and done list and save it.
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  //This is our delete task function.
  deleteTask(taskId: string): void {

    //If called then we a message is presented to the user asking them if they are sure they want to delete this task.
    if (confirm('Are you sure you want to delete this task?')) {

      //This is to ensure that we have the taskId for the task we want to delete.
      if (taskId) {
        console.log(`Task Item: ${taskId} was deleted.`);

        //This deletes the task from the employee collection.
        this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
          this.employee = res.data;
        }, err => {
          //If there is an error we output it to the console.
          console.log(err);
        }, () => {
          //Once complete we return the new updated todo and done list.
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    }
  }

  //This is our private updateTaskList function which we use in our drop event function.
  private updateTaskList(empId: number, todo: Item[], done: Item[]): void {

    //This calls the updateTask API to update the task list of our employee collections when we use the drag and drop feature.
    this.taskService.updateTask(this.empId, this.todo, this.done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      //If there is an error we output it to the console.
      console.log(err);
    }, () => {
      //We return the updates todo and done task list.
      this.todo = this.employee.todo;
      this.done = this.employee.done
    })
  }
}
