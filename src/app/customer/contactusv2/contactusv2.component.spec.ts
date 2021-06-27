/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Contactusv2Component } from './contactusv2.component';

describe('Contactusv2Component', () => {
  let component: Contactusv2Component;
  let fixture: ComponentFixture<Contactusv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Contactusv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Contactusv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
