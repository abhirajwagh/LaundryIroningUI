import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../Home/Home.component';
import { AdminAgentUsersComponent } from './admin-agent-users/admin-agent-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { GridTableModule } from '../common/grid-table/grid-table.module';
import { AdminIroningOrderComponent } from './admin-orders/admin-ironingOrder/admin-ironingOrder.component';
import { AdminLaundryOrderComponent } from './admin-orders/admin-laundryOrder/admin-laundryOrder.component';
import { AdminIroninglaundryOrderComponent } from './admin-orders/admin-ironinglaundryOrder/admin-ironinglaundryOrder.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';


const routes: Routes = [
  {
    path: 'cleanit/home',
    component: HomeComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: 'adminagentUser',
            component: AdminAgentUsersComponent,
          },
          {
            path: 'adminorders',
            component: AdminOrdersComponent,
            children: [
              {
                path: 'adminironingorder',
                component: AdminIroningOrderComponent,
              },
              {
                path: 'adminlaundryorder',
                component: AdminLaundryOrderComponent,
              },
              {
                path: 'adminironinglaundryorder',
                component: AdminIroninglaundryOrderComponent
              }
            ]
          }
        ]
      },
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
    GridTableModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
  ],
  declarations: [AdminComponent, AdminOrdersComponent, AdminAgentUsersComponent, AdminIroningOrderComponent,
    AdminLaundryOrderComponent, AdminIroninglaundryOrderComponent],
  providers: [TranslateService],
})
export class AdminModule { }
