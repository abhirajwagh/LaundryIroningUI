import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../Services/HttpService.service';
import { HeaderModule } from '../Shared/header/header.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { IroningComponent } from '../ironing/ironing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponentModule,
    RouterModule,
    HttpClientModule,
    HeaderModule,
    DashboardModule,
  ],
  declarations: [HomeComponent, IroningComponent],
  exports: [RouterModule, HomeComponent],
  providers: [HttpService]
})
export class HomeModule { }
