import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UserConstant } from '../Constants/Application.Constant';
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
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService, private ironingService: IroningService,
              private router: Router) {
    this.setUserLanguage(environment.DefaultLanguage);
  }

  ngOnInit() {
    this.ironingModel = new IroningModel();
    this.ironingModel.PickUpTimeSlot = null;
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
    TotalCost: ['', [Validators.required]]
  });
  return 'form created';
}


  SetMinDateForDatePicker() {
    const dtToday = new Date();
    let month = String(dtToday.getMonth() + 1);
    let day = String(dtToday.getDate());
    const year = dtToday.getFullYear();
    if (Number(month) < 10) {
      month = '0' + month.toString();
    }
    if (Number(day) < 10) {
      day = '0' + day.toString();
    }
    const minDate = year + '-' + month + '-' + day;
    return minDate;
  }

  SetMaxDateForDatePicker() {
    const dtToday = new Date();
    dtToday.setDate(dtToday.getDate() + 7);
    let month = String(dtToday.getMonth() + 1);
    let day = String(dtToday.getDate());
    const year = dtToday.getFullYear();
    if (Number(month) < 10) {
      month = '0' + month.toString();
    }
    if (Number(day) < 10) {
      day = '0' + day.toString();
    }
    const maxDate = year + '-' + month + '-' + day;
    return maxDate;
  }

  BindThePickUpTime() {
    this.pickupTimeSlot = [{ timeSlot: '9am to 10am' },
      { timeSlot: '10am to 11am' },
      { timeSlot: '11am to 12pm' },
      { timeSlot: '12pm to 1pm' },
      { timeSlot: '1pm to 2pm' },
      { timeSlot: '2pm to 3pm' },
      { timeSlot: '3pm to 4pm' },
      { timeSlot: '4pm to 5pm' },
      { timeSlot: '5pm to 6pm' },
      ]
  }
  SetTotalCost(event) {
    this.ironingModel.TotalCost = this.ironingModel.NoOfCloths * environment.IroningRate;
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
          this.router.navigate(['/home/ironingOrderSummery'], { queryParams: { orderId: result } });
          this.notificationService.success(result);
          this.isLoader = false;
       }
     }, error => {
       this.notificationService.error(this.translateService.instant('Notifications.Filter.FailedToADD'));
       this.isLoader = false;
     });
   }
 }
}
