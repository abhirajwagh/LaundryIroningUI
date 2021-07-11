import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { UserRegistrationService } from '../UserRegistration/UserRegistration.service';
import { SecurityAnswerModel } from './reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isLoader: boolean;
  SecurityQuestionForm: FormGroup;
  ResetPasswordForm: FormGroup;
  newPassword: any;
  confirmPassword: any;
  SecurityAnswerModel: SecurityAnswerModel;
  IsAnswerMatch: boolean;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService,
              private userRegisterService: UserRegistrationService,
              private titleService: Title) {
      this.titleService.setTitle('Cleanit | Forgot Password');
              }

  ngOnInit() {
    this.SecurityAnswerModel = new SecurityAnswerModel();
    this.IsAnswerMatch = false;
    this.CreateSecurityAnswerForm();
    this.CreateResetPasswordForm();
  }
 // create reset password form
 CreateSecurityAnswerForm() {
   this.SecurityQuestionForm = this.fb.group({
      userName: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      ans1: ['', [Validators.required]],
      ans2: ['', [Validators.required]],
    });
   return 'form created';
 }

 // create reset password form
  CreateResetPasswordForm() {
    this.ResetPasswordForm = this.fb.group({
      newPass: ['', [Validators.required]],
      conPass: ['', [Validators.required]]
     });
    return 'form created';
  }

  // check user name exists
  CheckSecurityAnswer() {
    if (this.SecurityAnswerModel.MobileNo !== null && this.SecurityAnswerModel.MobileNo !== '' &&
        this.SecurityAnswerModel.MobileNo !== undefined &&
        this.SecurityAnswerModel.SecurityAnswerOne !== null && this.SecurityAnswerModel.SecurityAnswerOne !== '' &&
        this.SecurityAnswerModel.SecurityAnswerOne !== undefined &&
        this.SecurityAnswerModel.SecurityAnswerTwo !== null && this.SecurityAnswerModel.SecurityAnswerTwo !== ''
        && this.SecurityAnswerModel.SecurityAnswerTwo !== undefined) {
      this.isLoader = true;
      this.userRegisterService.CheckSecurityAnswer(this.SecurityAnswerModel).subscribe(result => {
        if (result !== null && result === true) {
          this.IsAnswerMatch = true;
        } else {
          this.IsAnswerMatch = false;
        }
        this.isLoader = false;
      }, error => {
        this.IsAnswerMatch = false;
        this.notificationService.error('Failed to check the answer.');
        this.isLoader = false;
      });
    }
  }

  // check user name exists
  ChangeUserPassword() {
    if (this.SecurityAnswerModel.MobileNo !== null && this.SecurityAnswerModel.MobileNo !== '' &&
      this.SecurityAnswerModel.MobileNo !== undefined &&
      this.newPassword !== null && this.newPassword !== '' && this.newPassword !== undefined &&
      this.confirmPassword !== null && this.confirmPassword !== '' && this.confirmPassword !== undefined
    ) {
      this.isLoader = true;
      this.userRegisterService.UpdateUserPassword(this.newPassword, this.confirmPassword,
        this.SecurityAnswerModel.MobileNo).subscribe(result => {
          this.notificationService.success('Password changed successfully!!');
          this.isLoader = false;
          this.ClearNewPassword();
        }, error => {
          this.IsAnswerMatch = false;
          this.notificationService.error('Failed to change the password');
          this.isLoader = false;
        });
    }
  }

  ClearResetPassword() {
    this.SecurityAnswerModel.UserName = null;
    this.SecurityAnswerModel.MobileNo = null;
    this.SecurityAnswerModel.SecurityAnswerOne = null;
    this.SecurityAnswerModel.SecurityAnswerTwo = null;
  }

  ClearNewPassword() {
    this.SecurityAnswerModel.UserName = null;
    this.SecurityAnswerModel.MobileNo = null;
    this.SecurityAnswerModel.SecurityAnswerOne = null;
    this.SecurityAnswerModel.SecurityAnswerTwo = null;
    this.newPassword = null;
    this.confirmPassword = null;
    this.IsAnswerMatch = false;
  }
}
