import { Component, OnInit } from '@angular/core';
import { UserTypeConstants } from '../Constants/Application.Constant';
import { CommonService } from '../Services/Common.service';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  menuList: any;
  userType: string;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.userType = this.commonService.GetUserType();
    if (this.userType === UserTypeConstants.Customer || this.userType === UserTypeConstants.PhoneUser) {
      this.GetCustomerMenuList();
    } else if (this.userType === UserTypeConstants.Admin) {
      this.GetAdminMenuList();
    }
  }

  GetCustomerMenuList() {
    this.menuList = [{ Id: 1, Name: 'Account', routeUrl: '/cleanit/home/customerProfile', iconUrl: '../../../assets/img/order.png', selected: false },
    { Id: 2, Name: 'Recent Orders', routeUrl: '/cleanit/home/recentOrders', iconUrl: '../../../assets/img/recent-order.png', selected: false },
    { Id: 3, Name: 'Order History', routeUrl: '/cleanit/home/orderHistory', iconUrl: '../../../assets/img/history.png', selected: false },
    { Id: 4, Name: 'Logout', routeUrl: '/login', iconUrl: '../../../assets/img/logout.png', selected: false }];
  }

  GetAdminMenuList() {
    this.menuList = [{ Id: 1, Name: 'Orders', routeUrl: '/cleanit/home/admin/adminorders/adminironingorder', selected: false },
    { Id: 2, Name: 'Create Users', routeUrl: '/cleanit/home/admin/adminagentUser', selected: false }
    ];
  }
}
