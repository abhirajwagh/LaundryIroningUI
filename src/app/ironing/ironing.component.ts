import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UserConstant } from '../Constants/Application.Constant';
import { CommonService } from '../Services/Common.service';
import { IroningModel } from './ironing.Model';
import { IroningService } from './ironing.service';

@Component({
  selector: 'app-ironing',
  templateUrl: './ironing.component.html',
  styleUrls: ['./ironing.component.css']
})
export class IroningComponent implements OnInit {

  pickupTimeSlot: any;
  isLoader: boolean;
  ironingForm: FormGroup;
  ironingModel: IroningModel;
  defaultValue: any;
  @ViewChild('divID') span: ElementRef;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService, private ironingService: IroningService,
              private router: Router, private commonService: CommonService) {
    this.setUserLanguage(environment.DefaultLanguage);
  }

  ngOnInit() {
    this.defaultValue = environment.IroningRate ;
    this.ironingModel = new IroningModel();
    this.ironingModel.PickUpTimeSlot = null;
    this.ironingModel.TotalCost = 0;
    this.ironingModel.PickUpAddress = sessionStorage.getItem(UserConstant.Address);
    this.CreateIroningForm();
    this.BindThePickUpTime();
  }
  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }

// create ironing form
CreateIroningForm() {
  this.ironingForm = this.fb.group({
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
    if (this.ironingModel.NoOfCloths !== null) {
      this.ironingModel.TotalCost = this.ironingModel.NoOfCloths * environment.IroningRate;
    } else {
      this.ironingModel.TotalCost = 0;
    }
  }

  // Add new ironing orders
  AddIroningOrders() {
    if (this.ironingModel.NoOfCloths !== null && this.ironingModel.PickUpDate !== null
      && this.ironingModel.PickUpTimeSlot !== null && this.ironingModel.PickUpAddress !== null
      && this.ironingModel.TotalCost !== null) {
      this.isLoader = true;
      this.ironingModel.IsDelivered = false;
      this.ironingModel.OrderBy = sessionStorage.getItem(UserConstant.UserId);
      this.ironingService.AddIroningOrder(this.ironingModel).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.notificationService.success(this.translateService.instant('CommonText.OrderPlacedSuccess'));
          sessionStorage.setItem(UserConstant.IroningOrderId, result);
          this.ResetForm();
          setTimeout(() => {
            this.router.navigate(['/home/ironingOrderSummary']);
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
    this.ironingModel.NoOfCloths = null;
    this.ironingModel.PickUpDate = null;
    this.ironingModel.PickUpTimeSlot = null;
    this.ironingModel.TotalCost = 0;
  }
}
