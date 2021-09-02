/**
 * Title: signin.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 21 August 2021
 * Description: This is the sign in component ts file.
 */

//Here we add the import statements for this component.
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

//Here we export our Signin Component.
export class SigninComponent implements OnInit {

  //This creates our form variable.
  form: FormGroup;

  //This creates our error variable.
  error: string;

  //Here we include any imports that we need.
  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void
  {
    //This creates our form using the empId value validating that the input is a numerical value.
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  //This is the login in function.
  login(): void
  {
    const empId = this.form.controls['empId'].value;

    //This calls our api FindByEmpId to get the data for the employee id.
    this.http.get('/api/employees/' + empId).subscribe(res => {

      //If the empId is valid then it signs the user in and redirects them to the homepage.
      if (res)
      {
        sessionStorage.setItem('name', `${res['firstName']} ${res['lastName']}`);

        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      }
      //If it is invalid then it returns the error message.
      else
      {
        this.error = 'The Employee ID you entered is not valid, please try again.';
      }
    })
  }

}
