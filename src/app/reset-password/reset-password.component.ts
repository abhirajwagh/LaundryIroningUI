import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  SecurityAnswerModel: SecurityAnswerModel;
  IsAnswerMatch: boolean;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService,
              private userRegisterService: UserRegistrationService) { }

  ngOnInit() {
    this.SecurityAnswerModel = new SecurityAnswerModel();
    this.IsAnswerMatch = false;
    this.CreateResetPasswordForm();
  }
 // create equipment template form
 CreateResetPasswordForm() {
   this.SecurityQuestionForm = this.fb.group({
      userName: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      ans1: ['', [Validators.required]],
      ans2: ['', [Validators.required]],
    });
   return 'form created';
 }
  
  // check user name exists
  CheckSecurityAnswer() {
    if (this.SecurityAnswerModel.UserName !== null && this.SecurityAnswerModel.UserName !== '' &&
      this.SecurityAnswerModel.MobileNo !== null && this.SecurityAnswerModel.MobileNo !== '' &&
      this.SecurityAnswerModel.SecurityAnswerOne !== null && this.SecurityAnswerModel.SecurityAnswerOne !== '' &&
      this.SecurityAnswerModel.SecurityAnswerTwo !== null && this.SecurityAnswerModel.SecurityAnswerTwo !== '') {
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
        this.notificationService.error(this.translateService.instant('Notifications.Filter.FailedToADD'));
        this.isLoader = false;
      });
    }
  }
}
