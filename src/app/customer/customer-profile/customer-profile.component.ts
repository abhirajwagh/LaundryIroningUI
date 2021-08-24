import { SecurityAnswerModel } from './../../reset-password/reset-password.model';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { UserConstant } from 'src/app/Constants/Application.Constant';
import { CustomerService } from '../customer.service';
import { CustomerProfileModel } from './customer-profile.model';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customerProfileModel: CustomerProfileModel;
  isLoader: boolean;
  customerProfileForm: FormGroup;
  userId: string;
  constructor(private titleService: Title,
              private customerService: CustomerService,
              private translateService: TranslateService,
              private notificationService: NotificationsService,
              private fb: FormBuilder, private renderer: Renderer2) {
    this.titleService.setTitle('Cleanit | Account');
   }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'menu-open');
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.customerProfileModel = new CustomerProfileModel();
    this.CreateCustomerProfileForm();
    this.GetCustomerProfile();
  }

    // create laundry form
    CreateCustomerProfileForm() {
  this.customerProfileForm = this.fb.group({
    Username: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    Name: ['', [Validators.required]],
    Address: ['', [Validators.required]],
    MobileNo: ['', [Validators.required]],
    EmailId: ['', [Validators.required]],
    ans1: ['', [Validators.required]],
    ans2: ['', [Validators.required]],
    promoCode: ['', [Validators.required]],
    promoCodePoints: ['', [Validators.required]]
  });
  return 'form created';
}

  GetCustomerProfile() {
    this.isLoader = true;
    this.customerService.GetCustomerProfile(this.userId).subscribe(result => {
      this.customerProfileModel.UserId = result.UserId;
      this.customerProfileModel.UserName = result.UserName;
      this.customerProfileModel.Password = result.Password;
      this.customerProfileModel.Name = result.Name;
      this.customerProfileModel.Address = result.Address;
      this.customerProfileModel.MobileNo = result.MobileNo;
      this.customerProfileModel.EmailId = result.Email;
      this.customerProfileModel.SecurityAnsOne = result.SecurityAnswerOne;
      this.customerProfileModel.SecurityAnsTwo = result.SecurityAnswerTwo;
      this.customerProfileModel.PromoCode = result.PromoCode;
      this.customerProfileModel.PromoCodePoints = result.PromoCodePoints;
      this.isLoader = false;
    }, error => {
      this.notificationService.error(this.translateService.instant('CommonText.FailedToFetchData'));
      this.isLoader = false;
    });
  }


 UpdateCustomerProfile() {
    this.isLoader = true;
    this.customerService.UpdateCustomerProfile(this.customerProfileModel).subscribe(result => {
      this.notificationService.success(result);
      this.GetCustomerProfile();
    }, error => {
      this.notificationService.error('Failed to update the data');
      this.isLoader = false;
    });
  }
}
