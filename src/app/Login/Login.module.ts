import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '', component: LoginComponent
  },
  {
      path: 'login', component: LoginComponent
  }];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule, LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModule { }
