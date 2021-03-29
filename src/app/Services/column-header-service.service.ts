import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { FilterModel } from '../common/grid-table/grid-table.model';

@Injectable({
  providedIn: 'root'
})
export class ColumnHeaderService {

  headers: any;
  header: Header[] = [];
  constructor(private translateService: TranslateService) {
     this.setUserLanguage(environment.DefaultLanguage);
  }

  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }
  // method to translate the given string
  Translate(string): string {
    const inputString = this.translateService.instant(string);
    return inputString;
  }

  // method to create a headers
  CreateHeaders(displayString, fieldName, headercss, dataType: string = '',
                icon: string = '', width: string = '', navigation: string = '', FilterArray: FilterModel[] = []): Header {
    const newHeader = new Header(this.Translate(displayString), fieldName, headercss, dataType, icon, width, navigation, FilterArray);
    return newHeader;
  }


  // publish equipment column header
  AdminOrderListGridColumnHeaders() {
    this.header = [];
    this.header.push(this.CreateHeaders('EquipmentConfiguration.EquipmentCategoryName', 'equipmentCategoryName', 'text-left'));
    this.header.push(this.CreateHeaders('EquipmentConfiguration.EquipmentTypeName', 'equipmentTypeName', 'text-left'));
    this.header.push(this.CreateHeaders('EquipmentConfiguration.EquipmentName', 'equipmentName', 'text-left'));
    this.header.push(this.CreateHeaders('EquipmentConfiguration.NativeReference', 'controllerPath', 'text-left'));
    this.header.push(this.CreateHeaders('EquipmentConfiguration.MappedPointsTotalTemplated', 'MappedPointsTotalTemplated', 'text-left'));
    this.header.push(this.CreateHeaders('EquipmentConfiguration.PointList', 'PointList', 'text-left', '', 'fa fa-edit'));
    this.header.push(this.CreateHeaders('CommonText.DeviceList', 'DeviceList', 'text-left', '', 'fa fa-edit'));
    return this.header;
  }



}

// header class
export class Header {
  public name: string;
  public fieldName: string;
  public headercss: string;
  public dataType: string;
  public icon: string;
  public width: string;
  public navigation: string;
  public FilterArray?: FilterModel[];
  constructor(name: string, fieldName: string, headercss: string, dataType: string,
              icon: string, width: string, navigation: string, FilterArray?: FilterModel[]) {
    this.name = name;
    this.fieldName = fieldName;
    this.headercss = headercss;
    this.dataType = dataType;
    this.icon = icon;
    this.width = width;
    this.navigation = navigation;
    this.FilterArray = FilterArray;
  }
}
