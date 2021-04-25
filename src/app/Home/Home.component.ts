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
    if (this.userType === UserTypeConstants.Customer) {
      this.GetCustomerMenuList();
    } else if (this.userType === UserTypeConstants.Admin) {
      this.GetAdminMenuList();
    }
  }

  GetCustomerMenuList() {
    this.menuList = [{ Id: 1, Name: 'Account', routeUrl: '/cleanit/home/customerProfile' },
    { Id: 2, Name: 'Recent Orders', routeUrl: '/cleanit/home/recentOrders' },
    { Id: 3, Name: 'Order History', routeUrl: '/cleanit/home/orderHistory' },
    { Id: 4, Name: 'Contact Us', routeUrl: '/cleanit/home/contactUs' },
    { Id: 5, Name: 'FAQs', routeUrl: 'faq' }];
  }

  GetAdminMenuList() {
    this.menuList = [{ Id: 1, Name: 'Orders', routeUrl: '/cleanit/home/admin/adminorders/adminironingorder' },
    { Id: 2, Name: 'Create Users', routeUrl: '/cleanit/home/admin/adminagentUser' }
    ];
  }
}
