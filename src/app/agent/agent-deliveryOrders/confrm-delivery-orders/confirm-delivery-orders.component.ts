import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { OrderStausConstants, UserConstant } from 'src/app/Constants/Application.Constant';
import { AgentOrdersService } from '../../agent-orders.service';

@Component({
  selector: 'app-confirm-delivery-orders',
  templateUrl: './confirm-delivery-orders.component.html',
  styleUrls: ['./confirm-delivery-orders.component.css']
})
export class ConfirmDeliveryOrdersComponent implements OnInit, OnDestroy {

  orderDetails: any;
  isValidOrder: boolean;
  agentComment: any;
  operatorComment: any;
  isLoader: boolean;
  userId: any;
  constructor(private translateService: TranslateService,
              private agentOrdersService: AgentOrdersService,
              private notificationService: NotificationsService, private router: Router) { }

  ngOnInit() {
    this.orderDetails = JSON.parse(sessionStorage.getItem('agentdeliveryconfirmOrderDetails'));
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.agentComment = null;
    this.operatorComment = null;
  }

  UpdateOrderStatus() {
    this.isLoader = true;
    const inputModel = {
      OrderNumber: this.orderDetails.OrderNumber,
      OrderType: this.orderDetails.OrderType,
      OrderStatus: OrderStausConstants.Delivered,
      ConfirmBy: this.userId,
      Agentcomment: this.agentComment,
      OperatorComment: this.operatorComment,
      PromoCodePoints: String(this.orderDetails.CustomerPromoCodePoints),
      OrderBy: this.orderDetails.OrderBy,
      updatedCost: this.orderDetails.TotalCost
    };
    this.agentOrdersService.UpdateOrderStatus(inputModel).subscribe(result => {
      if (result !== null && result !== undefined) {
        this.notificationService.success(this.translateService.instant('CommonText.UpdateMsg'));
        this.isLoader = false;
        this.router.navigate(['/cleanit/agent/deliveryOrders']);
      }
    }, error => {
      this.notificationService.error(this.translateService.instant('CommonText.FailedToUpdate'));
      this.isLoader = false;
    });
  }

  ValidDeliveryOrder(event) {
    if (event.target.checked) {
      this.isValidOrder = true;
    } else {
      this.isValidOrder = false;
    }
  }

  ngOnDestroy() {
    sessionStorage.setItem('agentdeliveryconfirmOrderDetails', null);
  }
}
