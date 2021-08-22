/**
 * Title: base-layout.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 21 August 2021
 * Description: This is the base layout component ts file.
 */

//This is our imports.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

//This is where we export the Base Layout Component.
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
