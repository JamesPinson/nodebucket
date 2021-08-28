/**
 * Title: contact.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 28 August 2021
 * Description: This is the employee-api.js file.
 */

//This is the import statements.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

//This exports our contact component to the rest of the application.
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
