import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SpinnerComponentModule } from './Shared/spinner/spinner.module';
import { UserRegistrationModule } from './UserRegistration/UserRegistration.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ContactUsV2Module } from './customer/contactusv2/contactusV2.module';
import { FaqsV2Module } from './customer/faqsv2/faqsv2.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
      showProgressBar: true,
      clickIconToClose: true,
      // animate: 'rotate',
      timeOut: 5000
    }),
    SpinnerComponentModule,
    UserRegistrationModule,
    ResetPasswordModule,
    ContactUsV2Module,
    FaqsV2Module
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '../i18n/', '.json');
}