/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminIroninglaundryOrderComponent } from './admin-ironinglaundryOrder.component';

describe('AdminIroninglaundryOrderComponent', () => {
  let component: AdminIroninglaundryOrderComponent;
  let fixture: ComponentFixture<AdminIroninglaundryOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIroninglaundryOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIroninglaundryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
