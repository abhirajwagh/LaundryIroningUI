import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private titleService: Title, private renderer: Renderer2) {
    this.titleService.setTitle('Cleanit | Dashboard');
   }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'menu-open');
  }

  NevigateToModule(url) {
    this.router.navigate(['cleanit/home/' + url]);
  }

}
