import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../Home/Home.component';
import { AdminAgentUsersComponent } from './admin-agent-users/admin-agent-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { GridTableModule } from '../common/grid-table/grid-table.module';


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
  ],
  declarations: [AdminComponent, AdminOrdersComponent, AdminAgentUsersComponent]
})
export class AdminModule { }
