import { Directive, Input, OnInit, OnChanges, Renderer2, ElementRef } from '@angular/core';

@Directive({
    selector: '[apploading]'
})
export class LoadingDirective implements OnInit, OnChanges {
    @Input('apploading') apploading: boolean;
    //  @Input() show: boolean;

    constructor(private  el:  ElementRef,  private  renderer:  Renderer2) {
    }

    ngOnInit(): void {
    }
    ngOnChanges() {
        if  (this.apploading) {

            const  parent  =  this.renderer.parentNode(this.el.nativeElement);
            const  div  =  this.renderer.createElement('div');
            this.renderer.addClass(div,  'divshow');
            this.renderer.addClass(div,  'loadingimage');

            // tslint:disable-next-line:label-position
            const  ispan:  Element = this.renderer.createElement('span');
            this.renderer.addClass(ispan, 'spinnerloader');
          //  this.renderer.addClass(ispan,'fa-refresh');
           // this.renderer.addClass(ispan,'fa-spin');
            this.renderer.addClass(ispan,'loadermain');
            // this.el.nativeElement.parentElement.classList.add('positionReletive');
            const  finalhtml  =  this.renderer.appendChild(div,  ispan);
            this.renderer.appendChild(this.el.nativeElement,  div);
        }  else  {
            Array.from(this.el.nativeElement.children).forEach(child  =>  {
                if  (child['className']  ===  'divshow loadingimage') {
                    this.renderer.removeChild(this.el.nativeElement,  child);
                }
            });
        }
    }

}
