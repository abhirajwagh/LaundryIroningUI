import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ironing',
  templateUrl: './ironing.component.html',
  styleUrls: ['./ironing.component.css']
})
export class IroningComponent implements OnInit {

  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService) {
    this.setUserLanguage(environment.DefaultLanguage);
  }

  ngOnInit() {
  }
  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }
}
