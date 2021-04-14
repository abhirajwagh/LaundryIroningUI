/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IroningLaundryOrderSummaryComponent } from './laundryIroning-order-summary.component';


describe('LaundryOrderSummaryComponent', () => {
  let component: IroningLaundryOrderSummaryComponent;
  let fixture: ComponentFixture<IroningLaundryOrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IroningLaundryOrderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IroningLaundryOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
