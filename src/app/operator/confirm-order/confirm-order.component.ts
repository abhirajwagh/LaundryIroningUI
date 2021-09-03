import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { AgentOrdersService } from 'src/app/agent/agent-orders.service';
import { OrderStausConstants, UserConstant } from 'src/app/Constants/Application.Constant';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit, OnDestroy {

  orderDetails: any;
  isOrderProcessed: boolean;
  agentComment: any;
  operatorComment: any;
  isLoader: boolean;
  userId: any;
  constructor(private translateService: TranslateService,
              private agentOrdersService: AgentOrdersService,
              private notificationService: NotificationsService,
              private router: Router) { }

  ngOnInit() {
    this.orderDetails = JSON.parse(sessionStorage.getItem('operatorconfirmOrderDetails'));
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.agentComment = null;
    this.operatorComment = null;
  }


  UpdateOrderStatus() {
    this.isLoader = true;
    const inputModel = {
      OrderNumber: this.orderDetails.OrderNumber,
      OrderType: this.orderDetails.OrderType,
      OrderStatus: OrderStausConstants.Processed,
      ConfirmBy: this.userId,
      Agentcomment: this.agentComment,
      OperatorComment: this.operatorComment,
      PromoCodePoints: String(this.orderDetails.CustomerPromoCodePoints),
      OrderBy: this.orderDetails.OrderBy,
      updatedCost: this.orderDetails.TotalCost
    };
    this.agentOrdersService.UpdateOrderStatus(inputModel).subscribe(result => {
      if (result !== null && result !== undefined) {
        this.notificationService.success('Record updated successfully');
        this.router.navigate(['/cleanit/operator']);
        this.isLoader = false;
      }
    }, error => {
      this.notificationService.error('Failed to update');
      this.isLoader = false;
    });
  }

  ValidProcessedOrder(event) {
    if (event.target.checked) {
      this.isOrderProcessed = true;
    } else {
      this.isOrderProcessed = false;
    }
  }

  ngOnDestroy() {
    sessionStorage.setItem('operatorconfirmOrderDetails', null);
  }

}
