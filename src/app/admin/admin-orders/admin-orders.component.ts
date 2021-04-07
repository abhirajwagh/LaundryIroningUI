import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ColumnHeaderService } from 'src/app/Services/column-header-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  tabs: any;
  currentURL = '';
  constructor(private translateService: TranslateService, private router: Router) {
   }

  ngOnInit() {
    this.setUserLanguage(environment.DefaultLanguage);
    this.GetTabs();
  }

  GetTabs() {
    this.tabs = [
      { id: 1, tabName: 'Ironing Order', isSelected: false, isRadioBtn: false, routeName: 'adminironingorder' },
      { id: 2, tabName: 'Laundry Order', isSelected: false, isRadioBtn: false, routeName: 'adminlaundryorder' },
      { id: 3, tabName: 'Ironing + Laundry Order', isSelected: false, isRadioBtn: false, routeName: 'adminironinglaundryorder' },

    ];

    this.currentURL = this.router.url;
    if (this.currentURL === '') {
      this.router.navigate(['/cleanit/home/admin/adminorders/adminironingorder']);
    } else {
      const selectedTab = this.currentURL.split('/');
      this.tabs.forEach(i => {
        if (i.routeName === selectedTab[5]) {
          this.selectedTab(i);
        }
      });
    }
  }
  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }

  selectedTab(tab) {
    this.tabs.forEach(i => {
      if (i.id === tab.id) {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    if (tab.id === 1) {
      this.router.navigate(['/cleanit/home/admin/adminorders/adminironingorder']);
    } else if (tab.id === 2) {
      this.router.navigate(['/cleanit/home/admin/adminorders/adminlaundryorder']);
    } else if (tab.id === 3) {
      this.router.navigate(['/cleanit/home/admin/adminorders/adminironinglaundryorder']);
    }
  }

}
