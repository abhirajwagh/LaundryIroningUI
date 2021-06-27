import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contactusv2',
  templateUrl: './contactusv2.component.html',
  styleUrls: ['./contactusv2.component.css']
})
export class Contactusv2Component implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Cleanit | Contact Us');
   }

  ngOnInit() {
  }

}
