import { Component, OnInit } from '@angular/core';
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

  columnHeader: any;
  tableData: [];
  totalItems: number;
  constructor(private translateService: TranslateService) {
    this.setUserLanguage(environment.DefaultLanguage);
   }

  ngOnInit() {
    this.setUserLanguage(environment.DefaultLanguage);
    this.CostructGridColumnHeaders();
  }

  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }

  CostructGridColumnHeaders() {
    this.columnHeader = [
      {
        name: this.translateService.instant('Ironing.OrderId'), navigation: '',
        fieldName: 'OrderId', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: this.translateService.instant('Ironing.PickupAddress'), navigation: '',
        fieldName: 'PickupAddress', headercss: 'text-left', dataType: '', icon: ''
      },
      // {
      //   name: this.translateService.instant('Ironing.NoOfCloths'), navigation: '',
      //   fieldName: 'NoOfCloths', headercss: 'text-left', dataType: '', icon: ''
      // },
      {
        name: this.translateService.instant('Ironing.TimeSlot'), navigation: '',
        fieldName: 'TimeSlot', headercss: 'text-left', dataType: '', icon: ''
      },
      // {
      //   name: this.translateService.instant('CommonText.TotalCost'), navigation: '',
      //   fieldName: 'TotalCost', headercss: 'text-left', dataType: '', icon: ''
      // }
      // {
      //   name: this.translateService.instant('Ironing.PointList'),
      //   fieldName: 'PointList',
      //   headercss: 'text-left',
      //   dataType: '',
      //   icon: 'fa fa-edit',
      //   navigation: ''
      // }
    ];
  }

  selectedGridData(rowData) {

    console.log(rowData);
  }
}
