import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  constructor() {
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
    const values = [{ timeSlot: '9am to 10am' },
    { timeSlot: '10am to 11am' },
    { timeSlot: '11am to 12pm' },
    { timeSlot: '12pm to 1pm' },
    { timeSlot: '1pm to 2pm' },
    { timeSlot: '2pm to 3pm' },
    { timeSlot: '3pm to 4pm' },
    { timeSlot: '4pm to 5pm' },
    { timeSlot: '5pm to 6pm' },
    ];
    return values;
  }
}
