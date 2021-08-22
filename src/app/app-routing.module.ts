/**
 * Title: qpp-routing.component.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 21 August 2021
 * Description: This is the app-routing module ts file.
 */

//This is our imports.
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/auth.guard';

//This sets the routes for our application.
const routes: Routes = [
  {
    //This creates the base layout route with the child routes below it.
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    //This creates the Authlayout route with child routes below it.
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

//This exports our routing module.
export class AppRoutingModule { }
