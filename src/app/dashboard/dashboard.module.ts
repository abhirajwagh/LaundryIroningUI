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

const routes: Routes = [
  {
    path: 'home',
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
