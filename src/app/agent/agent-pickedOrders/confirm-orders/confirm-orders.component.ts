import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { OrderStausConstants, UserConstant } from 'src/app/Constants/Application.Constant';
import { AgentOrdersService } from '../../agent-orders.service';

@Component({
  selector: 'app-confirm-orders',
  templateUrl: './confirm-orders.component.html',
  styleUrls: ['./confirm-orders.component.css']
})
export class ConfirmOrdersComponent implements OnInit, OnDestroy {
  orderDetails: any;
  isValidOrder: boolean;
  agentComment: any;
  operatorComment: any;
  isLoader: boolean;
  userId: any;
  finalCost: number;
  promocodePoints: number;
  constructor(private translateService: TranslateService,
              private agentOrdersService: AgentOrdersService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.orderDetails = JSON.parse(sessionStorage.getItem('agentconfirmOrderDetails'));
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.agentComment = null;
    this.operatorComment = null;
    this.SetPromoCodeValues();
  }

  SetPromoCodeValues() {
    this.finalCost = Number(this.orderDetails.TotalCost) - Number(this.orderDetails.CustomerPromoCodePoints);
    if (this.finalCost < 0) {
      this.finalCost = 0;
    }
    if (Number(this.orderDetails.TotalCost) <= Number(this.orderDetails.CustomerPromoCodePoints)) {
      this.promocodePoints = Number(this.orderDetails.CustomerPromoCodePoints) - Number(this.orderDetails.TotalCost);
    } else {
      this.promocodePoints = 0;
    }
  }

  UpdateOrderStatus() {
    this.isLoader = true;
    const inputModel = {
      OrderNumber: this.orderDetails.OrderNumber,
      OrderType: this.orderDetails.OrderType,
      OrderStatus: OrderStausConstants.Picked,
      ConfirmBy: this.userId,
      Agentcomment: this.agentComment,
      OperatorComment: this.operatorComment,
      PromoCodePoints: String(this.promocodePoints),
      OrderBy: this.orderDetails.OrderBy,
      updatedCost: this.finalCost
    };
    this.agentOrdersService.UpdateOrderStatus(inputModel).subscribe(result => {
      if (result !== null && result !== undefined) {
        this.notificationService.success('Record updated successfully');
        this.isLoader = false;
      }
    }, error => {
      this.notificationService.error('Failed to update record');
      this.isLoader = false;
    });
  }

  ValidPickedOrder(event) {
    if (event.target.checked) {
      this.isValidOrder = true;
    } else {
      this.isValidOrder = false;
    }
  }

  ngOnDestroy() {
    sessionStorage.setItem('agentconfirmOrderDetails', null);
  }
}
