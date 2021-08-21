import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GridTableComponent } from './grid-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ng2-tooltip-directive';
@NgModule({
  declarations: [GridTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TooltipModule,
    PaginationModule.forRoot(),
  ],
  exports: [GridTableComponent],
  providers: [DatePipe]
})
export class GridTableModule { }
