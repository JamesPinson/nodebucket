/**
 * Title: home.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 21 August 2021
 * Description: This is the home component ts file.
 */

//This is our import statements for this component.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//Here we export the home component.
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
