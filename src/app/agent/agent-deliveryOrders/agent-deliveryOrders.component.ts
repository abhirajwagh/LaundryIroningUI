import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderStausConstants, UserConstant } from 'src/app/Constants/Application.Constant';
import { AgentOrdersService } from '../agent-orders.service';

@Component({
  selector: 'app-agent-deliveryOrders',
  templateUrl: './agent-deliveryOrders.component.html',
  styleUrls: ['./agent-deliveryOrders.component.css']
})
export class AgentDeliveryOrdersComponent implements OnInit, OnDestroy {
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
  constructor(private modalService: BsModalService , private translateService: TranslateService,
              private agentOrdersService: AgentOrdersService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.isValidOrder = false;
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.CostructGridColumnHeaders();
    this.GetDeliveryOrdersForAgent(true);
    this.id = setInterval(() => {
      this.GetDeliveryOrdersForAgent(false);
    }, 300000);
  }
  CostructGridColumnHeaders() {
    this.columnHeader = [
      {
        name: this.translateService.instant('Ironing.OrderId'), navigation: '',
        fieldName: 'OrderNumber', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: this.translateService.instant('Ironing.PickupAddress'), navigation: '',
        fieldName: 'PickUpAddress', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: this.translateService.instant('CommonText.TotalCost'), navigation: '',
        fieldName: 'TotalCost', headercss: 'text-left', dataType: '', icon: ''
      },
    ];
  }

  GetDeliveryOrdersForAgent(istableDataBlank) {
    if (istableDataBlank) {
      this.isLoader = true;
      this.tableData = [];
    }
    this.tempTableData = [];
    this.agentOrdersService.GetDeliveryOrdersForAgent(this.userId).subscribe(result => {
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
    const inputModel = {
      OrderNumber: this.orderSummary.OrderNumber,
      OrderType: this.orderSummary.OrderType,
      OrderStatus: OrderStausConstants.Delivered,
      ConfirmBy: this.userId
    };
    this.agentOrdersService.UpdateOrderStatus(inputModel).subscribe(result => {
      if (result !== null && result !== undefined) {
        this.notificationService.success(this.translateService.instant('CommonText.UpdateMsg'));
        this.GetDeliveryOrdersForAgent(true);
        this.closeSummeryPopup();
        this.isLoader = false;
      }
    }, error => {
      this.notificationService.error(this.translateService.instant('CommonText.FailedToUpdate'));
      this.isLoader = false;
    });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  ValidDeliveryOrder(event) {
    if (event.target.checked) {
      this.isValidOrder = true;
    } else {
      this.isValidOrder = false;
    }
  }
}
