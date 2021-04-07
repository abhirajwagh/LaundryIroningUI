import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderStausConstants, UserConstant } from 'src/app/Constants/Application.Constant';
import { AgentOrdersService } from '../agent-orders.service';

@Component({
  selector: 'app-agent-pickedOrders',
  templateUrl: './agent-pickedOrders.component.html',
  styleUrls: ['./agent-pickedOrders.component.css']
})
export class AgentPickedOrdersComponent implements OnInit {
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
  constructor(
    private modalService: BsModalService , private translateService: TranslateService,
    private agentOrdersService: AgentOrdersService,
    private notificationService: NotificationsService,
  ) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.CostructGridColumnHeaders();
    this.GetNewOrdersForAgent();
  }

  
  CostructGridColumnHeaders() {
    this.columnHeader = [
      {
        name: this.translateService.instant('Ironing.OrderId'), navigation: '',
        fieldName: 'OrderNumber', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: this.translateService.instant('Ironing.OrderStatus'), navigation: '',
        fieldName: 'OrderStatus', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: this.translateService.instant('CommonText.TotalCost'), navigation: '',
        fieldName: 'TotalCost', headercss: 'text-left', dataType: '', icon: ''
      },
    ];
  }

  GetNewOrdersForAgent() {
    this.isLoader = true;
    this.tableData = [];
    this.tempTableData = [];

    this.agentOrdersService.GetNewOrdersForAgent(this.userId).subscribe(result => {
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
          PaymentMode: i.PaymentMode,
          PickUpAddress: i.PickUpAddress,
          PickUpDate: i.PickUpDate,
          PickUpTimeSlot: i.PickUpTimeSlot,
          PickedAt: i.PickedAt,
          ProcessedAt: i.ProcessedAt,
          TotalCost: i.TotalCost,
          OrderType: i.OrderType

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
      this.notificationService.error(this.translateService.instant('CommonText.FailedToFetchData'));
      this.isLoader = false;
    });
  }
  
  selectedGridData(rowData, OrderSummeryPopup: TemplateRef<any>) {
    if (rowData.column === undefined) {
      this.orderSummary = rowData;
      this.modalRef = this.modalService.show(OrderSummeryPopup, { class: '', backdrop: 'static' });
    }
  }
  closeSummeryPopup() {
    this.modalRef.hide();
  }

  UpdateOrderStatus() {
      this.isLoader = true;
      this.agentOrdersService.UpdateOrderStatus(this.orderSummary.OrderNumber,this.orderSummary.OrderType, OrderStausConstants.Picked).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.notificationService.success(this.translateService.instant('CommonText.UpdateMsg'));
          this.GetNewOrdersForAgent();
          this.isLoader = false;
        }
      }, error => {
        this.notificationService.error(this.translateService.instant('CommonText.FailedToUpdate'));
        this.isLoader = false;
      });
  }

}