import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './spinner.directive';




@NgModule({
    imports: [CommonModule],
    declarations: [LoadingDirective],
    exports: [LoadingDirective]
})

export class SpinnerComponentModule { }
