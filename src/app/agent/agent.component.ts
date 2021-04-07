import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  tabs: any;
  currentURL = '';
  constructor(private translateService: TranslateService, private router: Router) { }

  ngOnInit() {
    this.setUserLanguage(environment.DefaultLanguage);
    this.GetTabs();
  }

  GetTabs() {
    this.tabs = [
      { id: 1, tabName: 'New Orders', isSelected: false, isRadioBtn: false, routeName: 'pickedOrders' },
      { id: 2, tabName: 'Delivery Orders', isSelected: false, isRadioBtn: false, routeName: 'deliveryOrders' }

    ];

    this.currentURL = this.router.url;
    if (this.currentURL === '') {
      this.router.navigate(['/cleanit/agent/pickedOrders']);
    } else {
      const selectedTab = this.currentURL.split('/');
      this.tabs.forEach(i => {
        if (i.routeName === selectedTab[3]) {
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
      this.router.navigate(['/cleanit/agent/pickedOrders']);
    } else if (tab.id === 2) {
      this.router.navigate(['/cleanit/agent/deliveryOrders']);
    }
  }
}
