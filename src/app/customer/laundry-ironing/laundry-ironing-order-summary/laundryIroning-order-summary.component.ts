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
import { IroningLaundryService } from '../laundry-ironing.service';

@Component({
  selector: 'app-laundryironing-order-summary',
  templateUrl: './laundryIroning-order-summary.component.html',
  styleUrls: ['./laundryIroning-order-summary.component.css']
})
export class IroningLaundryOrderSummaryComponent implements OnInit {

  pickupTimeSlot: any;
  isLoader: boolean;
  ironingLaundrySummaryForm: FormGroup;
  defaultValue: any;
  orderId: number;
  orderDetails: any;
  constructor(private translateService: TranslateService,
              private notificationService: NotificationsService,
              private ironingLaundryService: IroningLaundryService,
              private router: Router, private commonService: CommonService,
              private titleService: Title) {
    this.setUserLanguage(environment.DefaultLanguage);
    this.titleService.setTitle('Cleanit | OrderSummary');
   }

  ngOnInit() {
    this.orderDetails = null;
    this.orderId = Number(sessionStorage.getItem(UserConstant.LaundryIroningOrderId));
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
      this.ironingLaundryService.GetOrderDetailsById(this.orderId).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.orderDetails = result;
          this.isLoader = false;
        }
      }, error => {
        this.notificationService.error(this.translateService.instant('CommonText.FailedToFetchOrderDetails'));
        this.isLoader = false;
      });
    }
  }
}
