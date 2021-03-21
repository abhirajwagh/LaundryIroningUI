import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../Services/Common.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private commonService: CommonService,
              private translateService: TranslateService) {
  }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.getRoutePermission(route, state);
  }


  getRoutePermission(activeRoute, state): boolean {
    if (state.url.includes('/cleanit/')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
