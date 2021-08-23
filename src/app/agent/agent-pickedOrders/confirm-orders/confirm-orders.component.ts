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
  constructor(private translateService: TranslateService,
              private agentOrdersService: AgentOrdersService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.orderDetails = JSON.parse(sessionStorage.getItem('agentconfirmOrderDetails'));
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.agentComment = null;
    this.operatorComment = null;
  }

  UpdateOrderStatus() {
    this.isLoader = true;
    const inputModel = {
      OrderNumber: this.orderDetails.OrderNumber,
      OrderType: this.orderDetails.OrderType,
      OrderStatus: OrderStausConstants.Picked,
      ConfirmBy: this.userId,
      Agentcomment: this.agentComment,
      OperatorComment: this.operatorComment
    };
    this.agentOrdersService.UpdateOrderStatus(inputModel).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.notificationService.success(this.translateService.instant('CommonText.UpdateMsg'));
          this.isLoader = false;
        }
      }, error => {
        this.notificationService.error(this.translateService.instant('CommonText.FailedToUpdate'));
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
