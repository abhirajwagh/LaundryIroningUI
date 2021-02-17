import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UserConstant } from '../Constants/Application.Constant';
import { LoginModel } from './Login.Model';
import { LoginService } from './Login.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  LoginModel: LoginModel;
  isLoader: boolean;
  LoginForm: FormGroup;
  constructor(private translateService: TranslateService, private loginService: LoginService, private fb: FormBuilder,
              private notificationService: NotificationsService, private router: Router) {
      this.setUserLanguage(environment.DefaultLanguage);
   }

  ngOnInit() {
    this.CreateLoginForm();
    this.LoginModel = new LoginModel();
  }

  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }

  // create equipment template form
  CreateLoginForm() {
    this.LoginForm = this.fb.group({
      Username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required]]
     
    });
    return 'form created';
  }

   // GetUserDetails
   GetUserDetails() {
    if (this.LoginModel.UserName !== null && this.LoginModel.Password !== null) {
     this.isLoader = true;
     this.loginService.GetUserDetails(this.LoginModel).subscribe(result => {
       if (result.UserName !== null && result.Password !== null) {
         this.SetUserDataInSession(result);
         this.router.navigate(['/home/dashboard']);
       } else {
         this.notificationService.error(this.translateService.instant('Login.ENTER_VALID_USERNAME_&_PASSWORD'));
         this.Logout();
       }
       this.isLoader = false;
     }, error => {
         this.isLoader = false;
         this.Logout();
     });
   }
   }

  SetUserDataInSession(userData) {
    sessionStorage.setItem(UserConstant.Address, userData.Address)
    sessionStorage.setItem(UserConstant.UserId, userData.UserId);
    sessionStorage.setItem(UserConstant.UserName, userData.UserName);
    sessionStorage.setItem(UserConstant.Name, userData.Name);
    sessionStorage.setItem(UserConstant.IsAdmin, userData.IsAdmin);
  }

  Logout() {
      sessionStorage.clear();
      this.router.navigate(['/login']);
  }

}
