import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { OrderStausConstants, UserConstant } from 'src/app/Constants/Application.Constant';
import { CommonService } from 'src/app/Services/Common.service';
import { environment } from 'src/environments/environment';
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
  @ViewChild('UPIcheckbox', { static: false }) UPIcheckbox;
  @ViewChild('CODcheckbox', { static: false }) CODcheckbox;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService, private ironingLaundryService: IroningLaundryService,
              private router: Router, private commonService: CommonService,
              private titleService: Title) {
    this.setUserLanguage(environment.DefaultLanguage);
    this.titleService.setTitle('Cleanit | Ironing + Laundry');
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
    NoOfKgs: ['', [Validators.required]],
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
    if (this.ironingLaundryModel.NoOfKgs !== null) {
      this.ironingLaundryModel.TotalCost = this.ironingLaundryModel.NoOfKgs * environment.IroningLaundryRate;
    } else {
      this.ironingLaundryModel.TotalCost = 0;
    }
  }

  // Add new laundry ironing orders
  AddIroningLaundryOrders() {
    if (this.ironingLaundryModel.NoOfKgs !== null && this.ironingLaundryModel.PickUpDate !== null
      && this.ironingLaundryModel.PickUpTimeSlot !== null && this.ironingLaundryModel.PickUpAddress !== null
      && this.ironingLaundryModel.TotalCost !== null ) {
      this.isLoader = true;
      this.ironingLaundryModel.OrderBy = sessionStorage.getItem(UserConstant.UserId);
      this.ironingLaundryModel.OrderStatus = OrderStausConstants.New;
      this.ironingLaundryService.AddIroningLaundryOrder(this.ironingLaundryModel).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.notificationService.success(this.translateService.instant('CommonText.OrderPlacedSuccess'));
          sessionStorage.setItem(UserConstant.LaundryIroningOrderId, result);
          this.ResetForm();
          setTimeout(() => {
            this.router.navigate(['cleanit/home/ironinglaundryOrderSummary']);
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
    this.ironingLaundryModel.NoOfKgs = null;
    this.ironingLaundryModel.PickUpDate = null;
    this.ironingLaundryModel.PickUpTimeSlot = null;
    this.ironingLaundryModel.TotalCost = 0;
  }
}
