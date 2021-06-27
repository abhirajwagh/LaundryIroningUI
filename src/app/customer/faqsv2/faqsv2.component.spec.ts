/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Faqsv2Component } from './faqsv2.component';

describe('Faqsv2Component', () => {
  let component: Faqsv2Component;
  let fixture: ComponentFixture<Faqsv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Faqsv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Faqsv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
