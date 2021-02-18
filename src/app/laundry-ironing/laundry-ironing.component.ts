import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UserConstant } from '../Constants/Application.Constant';
import { CommonService } from '../Services/Common.service';
import { IroningLaundryModel } from './laundry-ironing.Model';
import { IroningLaundryService } from './laundry-ironing.service';

@Component({
  selector: 'app-laundry-ironing',
  templateUrl: './laundry-ironing.component.html',
  styleUrls: ['./laundry-ironing.component.css']
})
export class LaundryIroningComponent implements OnInit {

  pickupTimeSlot: any;
  isLoader: boolean;
  ironingLaundryForm: FormGroup;
  ironingLaundryModel: IroningLaundryModel;
  defaultValue: any;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService, private ironingLaundryService: IroningLaundryService,
              private router: Router, private commonService: CommonService) {
    this.setUserLanguage(environment.DefaultLanguage);
  }

  ngOnInit() {
    this.defaultValue = environment.IroningLaundryRate;
    this.ironingLaundryModel = new IroningLaundryModel();
    this.ironingLaundryModel.PickUpTimeSlot = null;
    this.ironingLaundryModel.TotalCost = 0;
    this.ironingLaundryModel.PickUpAddress = sessionStorage.getItem(UserConstant.Address);
    this.CreateLaundryForm();
    this.BindThePickUpTime();
  }

  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }

    // create laundry form
CreateLaundryForm() {
  this.ironingLaundryForm = this.fb.group({
    NoOfCloths: ['', [Validators.required]],
    PickupDate: ['', [Validators.required]],
    TimeSlot: ['', [Validators.required]],
    Address: ['', [Validators.required]],
    TotalCost: ['', [Validators.required]],
    DefaultCost: ['', []]
  });
  return 'form created';
}
  SetMinDateForDatePicker() {
    return this.commonService.SetMinDateForDatePicker();
  }

  SetMaxDateForDatePicker() {
    return this.commonService.SetMaxDateForDatePicker();
  }

  BindThePickUpTime() {
    this.pickupTimeSlot = this.commonService.BindThePickUpTime();
  }
  SetTotalCost(event) {
    if (this.ironingLaundryModel.NoOfCloths !== null) {
      this.ironingLaundryModel.TotalCost = this.ironingLaundryModel.NoOfCloths * environment.IroningLaundryRate;
    } else {
      this.ironingLaundryModel.TotalCost = 0;
    }
  }

  // Add new laundry ironing orders
  AddIroningLaundryOrders() {
    if (this.ironingLaundryModel.NoOfCloths !== null && this.ironingLaundryModel.PickUpDate !== null
      && this.ironingLaundryModel.PickUpTimeSlot !== null && this.ironingLaundryModel.PickUpAddress !== null
      && this.ironingLaundryModel.TotalCost !== null) {
      this.isLoader = true;
      this.ironingLaundryModel.IsDelivered = false;
      this.ironingLaundryModel.OrderBy = sessionStorage.getItem(UserConstant.UserId);
      this.ironingLaundryService.AddIroningLaundryOrder(this.ironingLaundryModel).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.notificationService.success(this.translateService.instant('CommonText.OrderPlacedSuccess'));
          sessionStorage.setItem(UserConstant.LaundryIroningOrderId, result);
          this.ResetForm();
          setTimeout(() => {
            this.router.navigate(['/home/ironinglaundryOrderSummary']);
            this.isLoader = false;
          }, 2000);
        }
      }, error => {
        this.notificationService.error(this.translateService.instant('CommonText.FailedToPlaceOrder'));
        this.isLoader = false;
      });
    }
  }

  ResetForm() {
    this.ironingLaundryModel.NoOfCloths = null;
    this.ironingLaundryModel.PickUpDate = null;
    this.ironingLaundryModel.PickUpTimeSlot = null;
    this.ironingLaundryModel.TotalCost = 0;
  }
}
