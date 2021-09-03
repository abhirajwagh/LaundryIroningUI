import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { UserConstant } from 'src/app/Constants/Application.Constant';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.css']
})
export class RecentOrdersComponent implements OnInit {

  isLoader: boolean;
  columnHeader: any;
  tableData: any;
  totalItems: number;
  selectedOrderId: any;
  userId: any;
  id: any;
  orderlist: any[];
  constructor(private translateService: TranslateService,
              private notificationService: NotificationsService,
              private customerService: CustomerService,
              private titleService: Title) {
      this.titleService.setTitle('Cleanit | Recent Orders');
               }

  ngOnInit() {
    this.userId = sessionStorage.getItem(UserConstant.UserId);
    this.GetOrdersForCustomer(true);
    this.id = setInterval(() => {
      this.GetOrdersForCustomer(false);
    }, 300000);
  }

  splitArr(arr, size) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  GetOrdersForCustomer(istableDataBlank) {
    if (istableDataBlank) {
      this.isLoader = true;
      this.tableData = [];
    }
    this.customerService.GetCustomerOrderHistory(this.userId, 1).subscribe(result => {
    if (result !== null && result.length > 0)
    {
      this.tableData = result;
      this.totalItems = result.length;
      this.orderlist = result; // this.splitArr(this.tableData, 3);
    } else {
      this.tableData = [];
      this.totalItems = 0;
    }
    this.isLoader = false;
    }, error => {
      this.notificationService.error('Failed to fetch data');
      this.isLoader = false;
    });
  }

}
