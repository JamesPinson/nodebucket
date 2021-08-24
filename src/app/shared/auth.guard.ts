/**
 * Title: auth.guard.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 21 August 2021
 * Description: This is the auth guard  ts file.
 */

//Here we add the imports we will need for this file.
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

//This is where we export our AuthGaurd.
export class AuthGuard implements CanActivate {

  //We put the imports we will use in the constructor.
  constructor(private router: Router, private cookieService: CookieService){

  }


  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot)
  {
    //This is were we assign the cookies to the user session.
    const sessionUser = this.cookieService.get('session_user');

    //If the session user authenticated then we return true.
    if (sessionUser)
    {
      return true;
    }

    //If it is not then we navigate back to the sign in page.
    else
    {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }

}
