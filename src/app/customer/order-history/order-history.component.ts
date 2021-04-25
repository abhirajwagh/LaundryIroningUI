import { Component, OnInit, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserConstant } from 'src/app/Constants/Application.Constant';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  isLoader: boolean;
  columnHeader: any;
  tableData: any;
  totalItems: number;
  selectedOrderId: any;
  modalRef: BsModalRef;
  loaderForPopup: boolean;
  userId: any;
  orderSummary: any;
  id: any;
  constructor(private modalService: BsModalService , private translateService: TranslateService,
              private notificationService: NotificationsService, private customerService: CustomerService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.CostructGridColumnHeaders();
    this.GetOrdersForCustomer(true);
    this.id = setInterval(() => {
      this.GetOrdersForCustomer(false);
    }, 300000);
  }

  CostructGridColumnHeaders() {
    this.columnHeader = [
      {
        name: this.translateService.instant('Ironing.OrderId'), navigation: '',
        fieldName: 'OrderNumber', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: 'Ordered Date', navigation: '',
        fieldName: 'CreatedAt', headercss: 'text-left', dataType: 'date', icon: ''
      },
      {
        name: this.translateService.instant('CommonText.TotalCost'), navigation: '',
        fieldName: 'TotalCost', headercss: 'text-left', dataType: '', icon: ''
      },
    ];
  }

  GetOrdersForCustomer(istableDataBlank) {
    if (istableDataBlank) {
      this.isLoader = true;
      this.tableData = [];
    }
    this.customerService.GetCustomerOrderHistory(this.userId, 30).subscribe(result => {
    if (result !== null && result.length > 0)
    {
      this.tableData = result;
      this.totalItems = result.length;
    } else {
      this.tableData = [];
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
}
