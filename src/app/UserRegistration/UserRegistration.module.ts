import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './UserRegistration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
import { HttpService } from '../Services/HttpService.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserRegistrationService } from './UserRegistration.service';
import { HeaderModule } from '../Shared/header/header.module';
import { FooterModule } from '../Shared/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponentModule,
    BrowserModule,
    HttpClientModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [UserRegistrationComponent],
  providers: [HttpService, UserRegistrationService]
})
export class UserRegistrationModule { }
