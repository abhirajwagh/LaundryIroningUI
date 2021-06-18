import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaundryComponent } from './laundry.component';
import { FooterModule } from 'src/app/Shared/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
  ],
  declarations: [LaundryComponent],
  exports: [LaundryComponent]
})
export class LaundryModule { }
