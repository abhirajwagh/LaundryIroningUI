import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Cleanit | Account');
   }

  ngOnInit() {
  }

}
