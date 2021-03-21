import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponentModule } from '../Shared/spinner/spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../Home/Home.component';


const routes: Routes = [
  {
    path: 'cleanit/home',
    component: HomeComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,
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
    RouterModule.forChild(routes),
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
