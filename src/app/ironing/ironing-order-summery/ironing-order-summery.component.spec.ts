/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IroningOrderSummeryComponent } from './ironing-order-summery.component';

describe('IroningOrderSummeryComponent', () => {
  let component: IroningOrderSummeryComponent;
  let fixture: ComponentFixture<IroningOrderSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IroningOrderSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IroningOrderSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
