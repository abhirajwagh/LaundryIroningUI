import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { UserConstant } from 'src/app/Constants/Application.Constant';
import { CommonService } from 'src/app/Services/Common.service';
import { environment } from 'src/environments/environment';
import { LaundryService } from '../laundry.service';

@Component({
  selector: 'app-laundry-order-summary',
  templateUrl: './laundry-order-summary.component.html',
  styleUrls: ['./laundry-order-summary.component.css']
})
export class LaundryOrderSummaryComponent implements OnInit {

  pickupTimeSlot: any;
  isLoader: boolean;
  laundrySummaryForm: FormGroup;
  defaultValue: any;
  orderId: number;
  orderDetails: any;
  constructor(private translateService: TranslateService,
              private notificationService: NotificationsService,
              private laundryService: LaundryService,
              private router: Router, private commonService: CommonService,
              private titleService: Title) {
    this.setUserLanguage(environment.DefaultLanguage);
    this.titleService.setTitle('Cleanit | OrderSummary');
   }

  ngOnInit() {
    this.orderDetails = null;
    this.orderId = Number(sessionStorage.getItem(UserConstant.LaundryOrderId));
    this.GetOrderDetails();
  }
  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }

  GetOrderDetails() {
    if (this.orderId !== null && this.orderId > 0) {
      this.isLoader = true;
      this.laundryService.GetOrderDetailsById(this.orderId).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.orderDetails = result;
          this.isLoader = false;
        }
      }, error => {
        this.notificationService.error('Failed to fetch data');
        this.isLoader = false;
      });
    }
  }
}
