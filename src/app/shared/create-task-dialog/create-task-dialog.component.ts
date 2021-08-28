/**
 * Title: create-task-dialog.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 28 August 2021
 * Description: This component is for the create task dialog window.
 */

//This is the import statements.
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})

//This exports the component to the rest of the application.
export class CreateTaskDialogComponent implements OnInit {

  //This creates the taskForm variable as a form group.
  taskForm: FormGroup;

  //We add the imports we will use in the constructor.
  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    //This builds our create task form with validation.
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  //This creates the createTask function which submits the task to the employee record.
  createTask(){
    this.dialogRef.close(this.taskForm.value);
  }

  //This creates the close function which closes the dialog box.
  cancel() {
    this.dialogRef.close();
  }
}
