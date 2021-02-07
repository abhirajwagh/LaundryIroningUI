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

const routes: Routes = [
  {
      path: 'home', component: HomeComponent
  }];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponentModule,
    RouterModule,
    HttpClientModule,
    HeaderModule
  ],
  declarations: [HomeComponent],
  exports: [RouterModule, HomeComponent],
  providers: [HttpService]
})
export class HomeModule { }
