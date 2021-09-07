import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { OrderStausConstants, UserConstant, UserTypeConstants } from 'src/app/Constants/Application.Constant';
import { CommonService } from 'src/app/Services/Common.service';
import { environment } from 'src/environments/environment';
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
  @ViewChild('UPIcheckbox', { static: false }) UPIcheckbox;
  @ViewChild('CODcheckbox', { static: false }) CODcheckbox;
  userType: string;
  isPhoneUser = false;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService, private ironingService: IroningService,
              private router: Router, private commonService: CommonService,
              private titleService: Title) {
    this.setUserLanguage(environment.DefaultLanguage);
    this.titleService.setTitle('Cleanit | Ironing');
  }

  ngOnInit() {
    this.userType = this.commonService.GetUserType();
    if (this.userType === UserTypeConstants.PhoneUser) {
      this.isPhoneUser = true;
    } else {
      this.isPhoneUser = false;
    }
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
      this.ironingModel.OrderBy = sessionStorage.getItem(UserConstant.UserId);
      this.ironingModel.OrderStatus = OrderStausConstants.New;
      this.ironingService.AddIroningOrder(this.ironingModel).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.notificationService.success('Order placed successfully');
          sessionStorage.setItem(UserConstant.IroningOrderId, result);
          this.ResetForm();
          setTimeout(() => {
            this.router.navigate(['cleanit/home/ironingOrderSummary']);
            this.isLoader = false;
          }, 2000);
        }
      }, error => {
        this.notificationService.error('Failed to place order.Please try after some time');
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

  isDisableTime(selectedTime: any): boolean {
    let isTimeOver = false;
    let currentHour = new Date().getHours() + 2;
    const currentMin = new Date().getHours();

    const currentAmPm = currentHour > 12 ? 'PM' : 'AM';

    if (currentHour > 12) {
      currentHour = currentHour - 12;
    }

    const selectedHour = +selectedTime.disableTime.substr(0, 2);
    const selectedMin = +selectedTime.disableTime.substr(3, 2);
    const selectedAMPM = selectedTime.disableTime.substr(6, 2);
    if(currentAmPm === selectedAMPM) {
      if (selectedHour < currentHour) {
        isTimeOver = true;
      } else if (selectedHour === currentHour) {
        if (selectedMin < currentMin) {
          isTimeOver = true;
        }
      }
    } else {
      isTimeOver = currentAmPm > selectedAMPM;
    }
    return isTimeOver;
  }
}
