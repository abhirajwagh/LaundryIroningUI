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
import { AdminModule } from '../admin/admin.module';
import { IroningComponent } from '../customer/ironing/ironing.component';
import { IroningOrderSummaryComponent } from '../customer/ironing/ironing-order-summary/ironing-order-summary.component';
import { LaundryComponent } from '../customer/laundry/laundry.component';
import { LaundryOrderSummaryComponent } from '../customer/laundry/laundry-order-summary/laundry-order-summary.component';
import { LaundryIroningComponent } from '../customer/laundry-ironing/laundry-ironing.component';
import { IroningLaundryOrderSummaryComponent } from '../customer/laundry-ironing/laundry-ironing-order-summary/laundryIroning-order-summary.component';
import { GridTableModule } from '../common/grid-table/grid-table.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderHistoryComponent } from '../customer/order-history/order-history.component';
import { RecentOrdersComponent } from '../customer/recent-orders/recent-orders.component';
import { MenuModule } from '../Shared/menu/menu.module';
import { FooterModule } from '../Shared/footer/footer.module';
import { ContactusComponent } from '../customer/contactus/contactus.component';

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
    AdminModule,
    GridTableModule,
    MenuModule,
    FooterModule,
    ModalModule.forRoot(),
  ],
  declarations: [HomeComponent, IroningComponent, IroningOrderSummaryComponent, LaundryComponent, LaundryOrderSummaryComponent,
    LaundryIroningComponent, IroningLaundryOrderSummaryComponent, OrderHistoryComponent, RecentOrdersComponent, ContactusComponent],
  exports: [RouterModule, HomeComponent],
  providers: [HttpService]
})
export class HomeModule { }
