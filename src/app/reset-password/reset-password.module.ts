import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
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
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
