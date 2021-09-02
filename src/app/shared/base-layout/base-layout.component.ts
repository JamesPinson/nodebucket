/**
 * Title: base-layout.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 1 September 2021
 * Description: This is the base layout component ts file.
 */

//This is our imports.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

//This is where we export the Base Layout Component.
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;

    this.name = sessionStorage.getItem('name');
    console.log('Signed in as ' + this.name);
  }

  ngOnInit(): void {
  }

  //This is the sign out function which clears the session cookies and redirects the user to the sign in page.
  signOut()
  {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
}
