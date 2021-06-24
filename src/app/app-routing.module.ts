import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserRegistrationComponent } from './UserRegistration/UserRegistration.component';


const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'cleanit/UserRegistration',
    component: UserRegistrationComponent
  },
  {
    path: 'cleanit/ResetPassword',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), LoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
