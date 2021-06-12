import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponentModule,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
