import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
export class AgentPickedOrdersComponent implements OnInit, OnDestroy {
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
  isValidOrder: boolean;
  agentComment: any;
  operatorComment: any;
  constructor(
    private modalService: BsModalService , private translateService: TranslateService,
    private agentOrdersService: AgentOrdersService,
    private notificationService: NotificationsService,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle('Cleanit | Picked Orders');
   }

  ngOnInit() {
    this.isValidOrder = false;
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.agentComment = null;
    this.operatorComment = null;
    this.CostructGridColumnHeaders();
    this.GetNewOrdersForAgent(true);
    this.id = setInterval(() => {
      this.GetNewOrdersForAgent(false);
    }, 300000);
  }


  CostructGridColumnHeaders() {
    this.columnHeader = [
      {
        name: 'Order no', navigation: '',
        fieldName: 'OrderNumber', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: 'Pickup address', navigation: '',
        fieldName: 'PickUpAddress', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: 'Total Cost', navigation: '',
        fieldName: 'TotalCost', headercss: 'text-left', dataType: '', icon: ''
      },
    ];
  }

  GetNewOrdersForAgent(istableDataBlank) {
    if (istableDataBlank) {
      this.isLoader = true;
      this.tableData = [];
    }
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
          CustomerPromoCodePoints: Number(i.CustomerPromoCodePoints),
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
      sessionStorage.setItem('agentconfirmOrderDetails', JSON.stringify(this.orderSummary));
      this.router.navigate(['/cleanit/agent/confirmOrders']);
      // this.modalRef = this.modalService.show(OrderSummeryPopup, { class: '', backdrop: 'static' });
    }
  }
  closeSummeryPopup() {
    this.orderSummary = null;
    this.agentComment = null;
    this.operatorComment = null;
    this.modalRef.hide();
  }

  UpdateOrderStatus() {
    this.isLoader = true;
    const inputModel = {
      OrderNumber: this.orderSummary.OrderNumber,
      OrderType: this.orderSummary.OrderType,
      OrderStatus: OrderStausConstants.Picked,
      ConfirmBy: this.userId,
      Agentcomment: this.agentComment,
      OperatorComment: this.operatorComment
    };
    this.agentOrdersService.UpdateOrderStatus(inputModel).subscribe(result => {
        if (result !== null && result !== undefined) {
          this.notificationService.success('Record updated successfully');
          this.GetNewOrdersForAgent(true);
          this.closeSummeryPopup();
          this.isLoader = false;
        }
      }, error => {
        this.notificationService.error('Failed to update');
        this.isLoader = false;
      });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  ValidPickedOrder(event) {
    if (event.target.checked) {
      this.isValidOrder = true;
    } else {
      this.isValidOrder = false;
    }
  }
}
