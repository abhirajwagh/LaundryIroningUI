import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UserRegistrationModel } from './UserRegistration.Model';
import { UserRegistrationService } from './UserRegistration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './UserRegistration.component.html',
  styleUrls: ['./UserRegistration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  UserRegistrationModel: UserRegistrationModel;
  isLoader: boolean;
  UserRegistrationForm: FormGroup;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService,
              private userRegisterService: UserRegistrationService,
              private titleService: Title,
              private router: Router
  ) {
    this.setUserLanguage(environment.DefaultLanguage);
    this.titleService.setTitle('Cleanit | Registration');
   }

  ngOnInit() {
    this.CreateUserRegistrationForm();
    this.UserRegistrationModel = new UserRegistrationModel();
  }

  // create equipment template form
  CreateUserRegistrationForm() {
    this.UserRegistrationForm = this.fb.group({
      Username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      ans1: ['', [Validators.required]],
      ans2: ['', [Validators.required]],
      promoCode: ['', []],
    });
    return 'form created';
 }

  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }

  keyPressAlphaNumeric(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

   // Register the new user
  RegisterUser() {
      if (this.UserRegistrationModel.UserName !== null && this.UserRegistrationModel.Password !== null
        && this.UserRegistrationModel.Name !== null && this.UserRegistrationModel.MobileNo !== null
        && this.UserRegistrationModel.Email !== null && this.UserRegistrationModel.Address !== null
        && this.UserRegistrationModel.SecurityAnswerOne !== null
        && this.UserRegistrationModel.SecurityAnswerTwo !== null) {
        this.isLoader = true;
        this.UserRegistrationModel.SecurityAnswerOne = this.UserRegistrationModel.SecurityAnswerOne.toString().toLowerCase();
        this.UserRegistrationModel.SecurityAnswerTwo = this.UserRegistrationModel.SecurityAnswerTwo.toString().toLowerCase();
        this.userRegisterService.RegisterUser(this.UserRegistrationModel).subscribe(result => {
          if (result !== null && result !== undefined) {
            if (result === 'Record already exists') {
              this.notificationService.warn(result);
            } else {
              this.notificationService.success('You have registered successfully.Please login to continue.');
              this.router.navigate(['/']);
            }
            this.isLoader = false;
          }
        }, error => {
          this.notificationService.error('Failed to register');
          this.isLoader = false;
        });
      }
  }


  IsPromoCodeValid() {
    this.isLoader = true;
    if (this.UserRegistrationModel.PromoCode !== undefined &&
      this.UserRegistrationModel.PromoCode !== null &&
      this.UserRegistrationModel.PromoCode !== '') {
      this.userRegisterService.IsPromoCodeValid(this.UserRegistrationModel.PromoCode).subscribe(result => {
        if (result) {
          this.RegisterUser();
        } else {
          this.isLoader = false;
          this.notificationService.error('Promo code is invalid.');
        }
      }, error => {
        this.notificationService.error('Failed to fetch data');
        this.isLoader = false;
        this.RegisterUser();
      });
    } else {
      this.RegisterUser();
    }
  }

  // check user name exists
  CheckUserNameExists() {
    if (this.UserRegistrationModel.UserName !== null && this.UserRegistrationModel.UserName !== '') {
     this.isLoader = true;
     this.userRegisterService.CheckUserNameExists(this.UserRegistrationModel.UserName).subscribe(result => {
       if (result !== null && result === true) {
           this.notificationService.warn('Record already exists');
       }
       this.isLoader = false;
     }, error => {
       this.notificationService.error('Failed to fetch data');
       this.isLoader = false;
     });
   }
  }
  nevigateToLogin() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
