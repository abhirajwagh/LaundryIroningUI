import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from '../Services/Common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private titleService: Title,
              private renderer: Renderer2,
              private  commonService: CommonService) {
    this.titleService.setTitle('Cleanit | Dashboard');
   }

  ngOnInit() {
    const isMobile = this.commonService.IsApplicationViewOnMobile();
    if (isMobile) {
      this.renderer.removeClass(document.body, 'menu-open');
      this.renderer.removeClass(document.body, 'vertical-menu-modern');
      this.renderer.addClass(document.body, 'vertical-overlay-menu');
      this.renderer.addClass(document.body, 'menu-hide');
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    } else {
      this.renderer.addClass(document.body, 'menu-expanded');
      this.renderer.removeClass(document.body, 'menu-open');
    }
  }

  NevigateToModule(url) {
    this.router.navigate(['cleanit/home/' + url]);
  }

}
