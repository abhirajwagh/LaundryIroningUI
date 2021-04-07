import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Login.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../Services/HttpService.service';
import { LoginService } from './Login.service';
import { HomeModule } from '../Home/Home.module';
import { AgentModule } from '../agent/agent.module';
import { OperatorModule } from '../operator/operator.module';

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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponentModule,
    RouterModule,
    HttpClientModule,
    HomeModule,
    AgentModule,
    OperatorModule
  ],
  exports: [RouterModule, LoginComponent],
  declarations: [LoginComponent],
  providers: [HttpService, LoginService]
})
export class LoginModule { }
