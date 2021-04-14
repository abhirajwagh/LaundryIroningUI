import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { OrderStausConstants, UserConstant } from 'src/app/Constants/Application.Constant';
import { CommonService } from 'src/app/Services/Common.service';
import { environment } from 'src/environments/environment';
import { LaundryModel } from './laundry.Model';
import { LaundryService } from './laundry.service';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit {

  pickupTimeSlot: any;
  isLoader: boolean;
  laundryForm: FormGroup;
  laundryModel: LaundryModel;
  defaultValue: any;
  @ViewChild('UPIcheckbox', { static: false }) UPIcheckbox;
  @ViewChild('CODcheckbox', { static: false }) CODcheckbox;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService, private laundryService: LaundryService,
              private router: Router, private commonService: CommonService) {
                this.setUserLanguage(environment.DefaultLanguage);
        }

  ngOnInit() {
    this.defaultValue = environment.LaundryRate;
    this.laundryModel = new LaundryModel();
    this.laundryModel.PickUpTimeSlot = null;
    this.laundryModel.TotalCost = 0;
    this.laundryModel.PickUpAddress = sessionStorage.getItem(UserConstant.Address);
    this.laundryModel.PaymentMode = null;
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
  this.laundryForm = this.fb.group({
    NoOfKgs: ['', [Validators.required]],
    PickupDate: ['', [Validators.required]],
    TimeSlot: ['', [Validators.required]],
    Address: ['', [Validators.required]],
    TotalCost: ['', [Validators.required]],
    DefaultCost: ['', []],
    UPI: ['', []],
    COD: ['', []],
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
    if (this.laundryModel.NoOfKgs !== null) {
      this.laundryModel.TotalCost = this.laundryModel.NoOfKgs * environment.LaundryRate;
    } else {
      this.laundryModel.TotalCost = 0;
    }
  }

// Add new laundry orders
AddLaundryOrders() {
  if (this.laundryModel.NoOfKgs !== null && this.laundryModel.PickUpDate !== null
    && this.laundryModel.PickUpTimeSlot !== null && this.laundryModel.PickUpAddress !== null
    && this.laundryModel.TotalCost !== null && this.laundryModel.PaymentMode !== null) {
    this.isLoader = true;
    this.laundryModel.OrderBy = sessionStorage.getItem(UserConstant.UserId);
    this.laundryModel.OrderStatus = OrderStausConstants.New;
    this.laundryService.AddLaundryOrder(this.laundryModel).subscribe(result => {
      if (result !== null && result !== undefined) {
        this.notificationService.success(this.translateService.instant('CommonText.OrderPlacedSuccess'));
        sessionStorage.setItem(UserConstant.LaundryOrderId, result);
        this.ResetForm();
        setTimeout(() => {
          this.router.navigate(['cleanit/home/laundryOrderSummary']);
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
    this.laundryModel.NoOfKgs = null;
    this.laundryModel.PickUpDate = null;
    this.laundryModel.PickUpTimeSlot = null;
    this.laundryModel.TotalCost = 0;
  }

  SetPaymentMode(event) {
    if (event.target.defaultValue === 'UPI') {
      if (event.target.checked) {
        this.CODcheckbox.nativeElement.checked = false;
        this.laundryModel.PaymentMode = event.target.defaultValue;
      }

    } else {
      if (event.target.checked) {
        this.UPIcheckbox.nativeElement.checked = false;
        this.laundryModel.PaymentMode = event.target.defaultValue;
      }
    }
  }
}
