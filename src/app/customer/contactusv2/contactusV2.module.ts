import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { HttpService } from 'src/app/Services/HttpService.service';
import { FooterModule } from 'src/app/Shared/footer/footer.module';
import { HeaderModule } from 'src/app/Shared/header/header.module';
import { SpinnerComponentModule } from 'src/app/Shared/spinner/spinner.module';
import { Contactusv2Component } from './contactusv2.component';

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
  declarations: [Contactusv2Component],
  providers: [HttpService]
})
export class ContactUsV2Module { }
