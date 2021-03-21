import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../Home/Home.component';
import { RouterModule, Routes } from '@angular/router';
import { IroningComponent } from '../ironing/ironing.component';
import { LaundryComponent } from '../laundry/laundry.component';
import { LaundryIroningComponent } from '../laundry-ironing/laundry-ironing.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IroningOrderSummaryComponent } from '../ironing/ironing-order-summary/ironing-order-summary.component';
import { LaundryOrderSummaryComponent } from '../laundry/laundry-order-summary/laundry-order-summary.component';
import { IroningLaundryOrderSummaryComponent } from '../laundry-ironing/laundry-ironing-order-summary/laundryIroning-order-summary.component';
import { AdminComponent } from '../admin/admin.component';

const routes: Routes = [
  {
    path: 'cleanit/home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'ironing',
        component: IroningComponent,
      },
      {
        path: 'laundry',
        component: LaundryComponent,
      },
      {
        path: 'laundryIroning',
        component: LaundryIroningComponent,
      },
      {
        path: 'ironingOrderSummary',
        component: IroningOrderSummaryComponent,
      },
      {
        path: 'laundryOrderSummary',
        component: LaundryOrderSummaryComponent,
      },
      {
        path: 'ironinglaundryOrderSummary',
        component: IroningLaundryOrderSummaryComponent,
      }
    ]
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponentModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DashboardComponent],
  exports:[DashboardComponent]
})
export class DashboardModule { }
