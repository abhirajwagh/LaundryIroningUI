import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/Common.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  tempMenuList: any;
  
  @Input()
  set MenuList(list: any) {
          if (list) {
            this.tempMenuList = list;
          } else {
            this.tempMenuList = [];
          }
  }
  constructor(private router: Router,
              private renderer: Renderer2,
              private commonService: CommonService ) { }

  ngOnInit() {
  }

  nevigateToUrl(menu: any) {

    const isMobile = this.commonService.IsApplicationViewOnMobile();
    if (isMobile) {
      this.renderer.removeClass(document.body, 'menu-open');
    } else {
      this.renderer.addClass(document.body, 'menu-open');
    }

    if (menu.Name === 'Logout') {
      this.nevigateToLogin();
    } else {
      this.router.navigate([menu.routeUrl]);
    }
    this.SetActiveClass(menu);
  }

  nevigateToLogin() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  SetActiveClass(selectedMenu) {
    for (let index = 0; index < this.tempMenuList.length; index++) {
      if (this.tempMenuList[index].Id === selectedMenu.Id) {
        this.tempMenuList[index].selected = true;
      } else {
        this.tempMenuList[index].selected = false;
      }
    }
  }
}


