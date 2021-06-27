import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Contactusv2Component } from './customer/contactusv2/contactusv2.component';
import { Faqsv2Component } from './customer/faqsv2/faqsv2.component';
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
  },
  {
    path: 'cleanit/contactUsV2',
    component: Contactusv2Component,
  },
  {
    path: 'cleanit/faqsV2',
    component: Faqsv2Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), LoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
