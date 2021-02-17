import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { UserConstant } from 'src/app/Constants/Application.Constant';
import { CommonService } from 'src/app/Services/Common.service';
import { environment } from 'src/environments/environment';
import { IroningService } from '../ironing.service';

@Component({
  selector: 'app-ironing-order-summary',
  templateUrl: './ironing-order-summary.component.html',
  styleUrls: ['./ironing-order-summary.component.css']
})
export class IroningOrderSummaryComponent implements OnInit {

  pickupTimeSlot: any;
  isLoader: boolean;
  ironingSummaryForm: FormGroup;
  defaultValue: any;
  orderId: number;
  orderDetails: any;
  constructor(private translateService: TranslateService,
              private notificationService: NotificationsService,
              private ironingService: IroningService,
              private router: Router, private commonService: CommonService) {
    this.setUserLanguage(environment.DefaultLanguage);
   }

  ngOnInit() {
    this.orderDetails = null;
    this.orderId = Number(sessionStorage.getItem(UserConstant.IroningOrderId));
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
      this.ironingService.GetOrderDetailsById(this.orderId).subscribe(result => {
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
