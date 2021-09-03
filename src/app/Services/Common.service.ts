import { UserConstant, UserTypeConstants } from './../Constants/Application.Constant';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  UserTypes: any;
  UserType: string;
  constructor() {
    this.UserTypes = [{ UserTypeId: 'A85DD3C8-4423-429F-BF9E-7F28DC68D4F4', UserType: UserTypeConstants.Customer },
    { UserTypeId: '295362B3-FCEF-451B-93CA-85E8B14BD5C6', UserType: UserTypeConstants.Agent },
      { UserTypeId: '18844E3E-1DC0-4C81-ADB4-E862195F732D', UserType: UserTypeConstants.Admin },
      { UserTypeId: '47FC4FAA-D6D6-4282-8936-9A96B66B126A', UserType: UserTypeConstants.Operator },
      { UserTypeId: 'E8E8EF68-2244-445E-8999-A213C73D2B3B', UserType: UserTypeConstants.SuperAdmin },
      { UserTypeId: 'FBEF5BF9-2CF6-457F-BECE-5DCC8170801B', UserType: UserTypeConstants.PhoneUser }
    ];
    this.SetUserType();
  }

  SetMinDateForDatePicker() {
    const dtToday = new Date();
    let month = String(dtToday.getMonth() + 1);
    let day = String(dtToday.getDate());
    const year = dtToday.getFullYear();
    if (Number(month) < 10) {
      month = '0' + month.toString();
    }
    if (Number(day) < 10) {
      day = '0' + day.toString();
    }
    const minDate = year + '-' + month + '-' + day;
    return minDate;
  }

  SetMaxDateForDatePicker() {
    const dtToday = new Date();
    dtToday.setDate(dtToday.getDate() + 7);
    let month = String(dtToday.getMonth() + 1);
    let day = String(dtToday.getDate());
    const year = dtToday.getFullYear();
    if (Number(month) < 10) {
      month = '0' + month.toString();
    }
    if (Number(day) < 10) {
      day = '0' + day.toString();
    }
    const maxDate = year + '-' + month + '-' + day;
    return maxDate;
  }

  BindThePickUpTime() {
    const values = [{ timeSlot: '9am to 10am', disableTime: '10:00 AM' },
    { timeSlot: '10am to 11am', disableTime: '11:00 AM'},
    { timeSlot: '11am to 12pm', disableTime: '12:00 AM' },
    { timeSlot: '12pm to 1pm', disableTime: '1:00 PM' },
    { timeSlot: '1pm to 2pm', disableTime: '2:00 PM' },
    { timeSlot: '2pm to 3pm', disableTime: '3:00 PM' },
    { timeSlot: '3pm to 4pm', disableTime: '4:00 PM' },
    { timeSlot: '4pm to 5pm', disableTime: '5:00 PM' },
    { timeSlot: '5pm to 6pm', disableTime: '6:00 PM' },
    ];
    return values;
  }
  SetUserType() {
    if (sessionStorage.getItem(UserConstant.UserTypeId) !== null) {
      this.UserType = this.UserTypes.filter(u => u.UserTypeId.toString().toLowerCase() === sessionStorage.getItem(UserConstant.UserTypeId).toLowerCase())[0].UserType;
    }
  }

  GetUserType(): string {
    return this.UserType;
  }
  getExcelFileNameWithDateTime(fileName, type = '.xlsx'): string {
    const dateFormat = moment().format('YYYY-MM-DD_HH_mm_ss');
    return fileName + '_' + dateFormat + type;
  }

  IsApplicationViewOnMobile(): boolean {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }
}
