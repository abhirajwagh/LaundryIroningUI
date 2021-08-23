import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GridTableModule } from '../common/grid-table/grid-table.module';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
import { HomeComponent } from '../Home/Home.component';
import { AgentPickedOrdersComponent } from './agent-pickedOrders/agent-pickedOrders.component';
import { HeaderModule } from '../Shared/header/header.module';
import { AgentDeliveryOrdersComponent } from './agent-deliveryOrders/agent-deliveryOrders.component';
import { ConfirmOrdersComponent } from './agent-pickedOrders/confirm-orders/confirm-orders.component';
import { ConfirmDeliveryOrdersComponent } from './agent-deliveryOrders/confrm-delivery-orders/confirm-delivery-orders.component';

const routes: Routes = [
  {
    path: 'cleanit/agent',
    component: AgentComponent,
    children: [
      {
        path: 'pickedOrders',
        component: AgentPickedOrdersComponent,
      },
      {
        path: 'deliveryOrders',
        component: AgentDeliveryOrdersComponent,
      },
      {
        path: 'confirmOrders',
        component: ConfirmOrdersComponent,
      },
      {
        path: 'confirmDeliveryOrders',
        component: ConfirmDeliveryOrdersComponent,
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
    HeaderModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
  ],
  declarations: [AgentComponent, AgentPickedOrdersComponent, AgentDeliveryOrdersComponent,
    ConfirmOrdersComponent, ConfirmDeliveryOrdersComponent]
})
export class AgentModule { }
