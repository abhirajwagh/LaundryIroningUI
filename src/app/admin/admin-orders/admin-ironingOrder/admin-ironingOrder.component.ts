import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { AdminOrdersService } from '../admin-orders.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-ironingOrder',
  templateUrl: './admin-ironingOrder.component.html',
  styleUrls: ['./admin-ironingOrder.component.css']
})
export class AdminIroningOrderComponent implements OnInit {
  isLoader: boolean;
  columnHeader: any;
  tableData: any;
  totalItems: number;
  tempTableData: any;
  selectedOrderId: any;
  modalRef: BsModalRef;
  loaderForPopup: boolean;
  agentListForm: FormGroup;
  agentId: any;
  agentList: any;
  isAssignButtonValid: boolean;
  orderSummary: any;
  id: any;
  constructor(
              private modalService: BsModalService , private translateService: TranslateService,
              private adminOrdersService: AdminOrdersService,
              private notificationService: NotificationsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.CostructGridColumnHeaders();
    this.GetIroningOrdersForAdmin();
    this.selectedOrderId = [];
    this.id = setInterval(() => {
      this.GetIroningOrdersForAdmin();
    }, 60000);
  }

  CostructGridColumnHeaders() {
    this.columnHeader = [
      {
        name: this.translateService.instant('Ironing.OrderId'), navigation: '',
        fieldName: 'OrderId', headercss: 'text-left', dataType: '', icon: ''
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

  selectedGridData(rowData, OrderSummeryPopup: TemplateRef<any>) {
    if (rowData.column === undefined) {
      this.orderSummary = rowData;
      this.modalRef = this.modalService.show(OrderSummeryPopup, { class: '', backdrop: 'static' });
    } else {
      if (rowData !== undefined) {
        if (rowData.column === 'Selected' && rowData.allcheck === false) {
          this.selectedOrderId.push(rowData.rowData.OrderId);
        } else if (rowData.column === 'Unselected' && rowData.allcheck === false) {
          if (this.selectedOrderId.length > 0) {
            for (let index = 0; index < this.selectedOrderId.length; index++) {
              if (this.selectedOrderId[index] === rowData.rowData.OrderId) {
                this.selectedOrderId.splice(index, 1);
              }
            }
          }
        } else if (rowData.column === 'Selected' && rowData.allcheck === true) {
          this.selectedOrderId = [];
          for (let index = 0; index < rowData.rowData.length; index++) {
            this.selectedOrderId.push(rowData.rowData[index].OrderId);
          }
        }
        else if (rowData.column === 'AllUnselected' && rowData.allcheck === false) {
          this.selectedOrderId = [];
        }
      }
    }
  }

  GetIroningOrdersForAdmin() {
    //this.isLoader = true;
   // this.tableData = [];
    this.tempTableData = [];
    this.adminOrdersService.GetIroningOrdersForAdmin().subscribe(result => {
    if (result !== null && result.length > 0)
    {
      result.forEach(i => {
        const dataForTable = {
          AgentId: i.AgentId,
          AgentMobileNo: i.AgentMobileNo,
          AgentName: i.AgentName,
          AgentUserName: i.AgentUserName,
          CreatedAt: i.CreatedAt,
          CustomerId: i.CustomerId,
          CustomerMobileNo: i.CustomerMobileNo,
          isChecked: false,
          CustomerName: i.CustomerName,
          CustomerUserName: i.CustomerUserName,
          DeliveredAt: i.DeliveredAt,
          Id: i.Id,
          NoOfCloths: i.NoOfCloths,
          OrderId: i.OrderId,
          OrderStatus: i.OrderStatus,
          PaymentMode: i.PaymentMode,
          PickUpDate: i.PickUpDate,
          PickUpTimeSlot: i.PickUpTimeSlot,
          PickedAt: i.PickedAt,
          ProcessedAt: i.ProcessedAt,
          TotalCost: i.TotalCost

        };
        this.tempTableData.push(dataForTable);
      });
      this.tableData = this.tempTableData;
      this.totalItems = this.tempTableData.length;
    } else {
      this.totalItems = 0;
    }
   // this.isLoader = false;
    }, error => {
      this.notificationService.error(this.translateService.instant('Notifications.Filter.FailedToADD'));
      this.isLoader = false;
    });
}
  OpenOrderAssignmentpoup(OrderAssignmentPopup: TemplateRef<any>) {
    this.CreateAgentListForm();
    this.agentId = null;
    this.GetAgentUsers();
    this.isAssignButtonValid = false;
    this.modalRef = this.modalService.show(OrderAssignmentPopup, { class: '', backdrop: 'static' });
  }
  closeAssignmentPopup() {
    this.agentId = null;
    this.modalRef.hide();
  }

  CreateAgentListForm() {
    this.agentListForm = this.fb.group({
      Agents: [this.agentId, [Validators.required]]
    });
    return 'form created';
  }

  GetAgentUsers() {
    this.loaderForPopup = true;
    this.adminOrdersService.GetAgentUsers().subscribe(result => {
      this.agentList = result;
      this.loaderForPopup = false;
    }, error => {
      this.notificationService.error(this.translateService.instant('CommonText.FailedToFetchData'));
      this.loaderForPopup = false;
    });
  }

  AssignSelectedOrdersToAgent() {
    this.loaderForPopup = true;
    this.adminOrdersService.AssignSelectedOrdersToAgent(this.agentId, this.selectedOrderId).subscribe(result => {
      this.notificationService.success(this.translateService.instant('Ironing.OrderAssignmentSuccess'));
      this.GetIroningOrdersForAdmin();
      this.loaderForPopup = false;
    }, error => {
      this.notificationService.error(this.translateService.instant('Ironing.OrderAssignmentFailed'));
      this.loaderForPopup = false;
    });
  }

  ValidateButton() {
    if (this.agentId !== null && this.agentId !== 'null') {
      this.isAssignButtonValid = true;
    } else {
      this.isAssignButtonValid = false;
    }
  }

  closeSummeryPopup() {
    this.modalRef.hide();
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
