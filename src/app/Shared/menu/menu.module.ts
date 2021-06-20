import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponentModule } from '../spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponentModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuModule { }
