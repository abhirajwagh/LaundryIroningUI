import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faqsv2',
  templateUrl: './faqsv2.component.html',
  styleUrls: ['./faqsv2.component.css']
})
export class Faqsv2Component implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Cleanit | FAQs');
   }

  ngOnInit() {
  }

}
