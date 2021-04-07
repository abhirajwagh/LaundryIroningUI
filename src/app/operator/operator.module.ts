import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorComponent } from './operator.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GridTableModule } from '../common/grid-table/grid-table.module';
import { HeaderModule } from '../Shared/header/header.module';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';


const routes: Routes = [
  {
    path: 'cleanit/operator',
    component: OperatorComponent,
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
  declarations: [OperatorComponent]
})
export class OperatorModule { }
