import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('Cleanit | Dashboard');
   }

  ngOnInit() {
  }

  NevigateToModule(url) {
    this.router.navigate(['cleanit/home/' + url]);
  }

}
