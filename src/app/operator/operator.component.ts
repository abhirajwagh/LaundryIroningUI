import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgentOrdersService } from '../agent/agent-orders.service';
import { OrderStausConstants, UserConstant } from '../Constants/Application.Constant';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit, OnDestroy {
  isLoader: boolean;
  columnHeader: any;
  tableData: any;
  totalItems: number;
  tempTableData: any;
  selectedOrderId: any;
  modalRef: BsModalRef;
  loaderForPopup: boolean;
  userId: any;
  orderSummary: any;
  id: any;
  isOrderProcessed: boolean;
  agentComment: any;
  operatorComment: any;
  constructor(private modalService: BsModalService , private translateService: TranslateService,
              private agentOrdersService: AgentOrdersService,
              private notificationService: NotificationsService,
              private router: Router) { }

  ngOnInit() {
    this.isOrderProcessed = false;
    this.agentComment = null;
    this.operatorComment = null;
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.CostructGridColumnHeaders();
    this.GetPickedOrdersForOperator(true);
    this.id = setInterval(() => {
      this.GetPickedOrdersForOperator(false);
    }, 300000);
  }
  CostructGridColumnHeaders() {
    this.columnHeader = [
      {
        name: 'Order No', navigation: '',
        fieldName: 'OrderNumber', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: 'Order Status', navigation: '',
        fieldName: 'OrderStatus', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: 'Total Cost', navigation: '',
        fieldName: 'TotalCost', headercss: 'text-left', dataType: '', icon: ''
      },
    ];
  }

  GetPickedOrdersForOperator(isTableDataBlank) {
    if (isTableDataBlank) {
      this.isLoader = true;
      this.tableData = [];
    }
    this.tempTableData = [];

    this.agentOrdersService.GetPickedOrdersForOperator(this.userId).subscribe(result => {
    if (result !== null && result.length > 0)
    {
      result.forEach(i => {
        const dataForTable = {
          CreatedAt: i.CreatedAt,
          CustomerMobileNo: i.CustomerMobileNo,
          isChecked: false,
          CustomerName: i.CustomerName,
          DeliveredAt: i.DeliveredAt,
          NoOfCloths: i.NoOfCloths,
          NoOfKgs: i.NoOfKgs,
          OrderNumber: i.OrderNumber,
          OrderStatus: i.OrderStatus,
          PickUpAddress: i.PickUpAddress,
          PickUpDate: i.PickUpDate,
          PickUpTimeSlot: i.PickUpTimeSlot,
          PickedAt: i.PickedAt,
          ProcessedAt: i.ProcessedAt,
          TotalCost: i.TotalCost,
          OrderType: i.OrderType,
          AgentComment: i.AgentComment,
          OperatorComment: i.OperatorComment,
          CustomerPromoCodePoints: i.CustomerPromoCodePoints,
          OrderBy: i.OrderBy

        };
        this.tempTableData.push(dataForTable);
      });
      this.tableData = this.tempTableData;
      this.totalItems = this.tempTableData.length;
    } else {
      this.totalItems = 0;
    }
    this.isLoader = false;
    }, error => {
      this.notificationService.error('Failed to fetch data');
      this.isLoader = false;
    });
  }

  selectedGridData(rowData, OrderSummeryPopup: TemplateRef<any>) {
    if (rowData.column === undefined) {
      this.orderSummary = rowData;
      sessionStorage.setItem('operatorconfirmOrderDetails', JSON.stringify(this.orderSummary));
      this.router.navigate(['/cleanit/operator/confirmOrders']);
      // this.modalRef = this.modalService.show(OrderSummeryPopup, { class: '', backdrop: 'static' });
    }
  }
  closeSummeryPopup() {
    this.modalRef.hide();
    this.agentComment = null;
    this.operatorComment = null;
  }

  UpdateOrderStatus() {
    this.isLoader = true;
    const inputModel = {
      OrderNumber: this.orderSummary.OrderNumber,
      OrderType: this.orderSummary.OrderType,
      OrderStatus: OrderStausConstants.Processed,
      ConfirmBy: this.userId,
      Agentcomment: this.agentComment,
      OperatorComment: this.operatorComment
    };
    this.agentOrdersService.UpdateOrderStatus(inputModel).subscribe(result => {
      if (result !== null && result !== undefined) {
        this.notificationService.success('Record updated successfully');
        this.GetPickedOrdersForOperator(true);
        this.closeSummeryPopup();
        this.isLoader = false;
      }
    }, error => {
      this.notificationService.error('Failed to update record');
      this.isLoader = false;
    });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  ValidProcessedOrder(event) {
    if (event.target.checked) {
      this.isOrderProcessed = true;
    } else {
      this.isOrderProcessed = false;
    }
  }
}
