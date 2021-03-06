import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserConstant } from 'src/app/Constants/Application.Constant';
import { CommonService } from 'src/app/Services/Common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userType: string;
  loginUsername: string;
  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit() {
    this.loginUsername = sessionStorage.getItem(UserConstant.UserName);
    if (this.loginUsername !== null && this.loginUsername !== undefined && this.loginUsername !== '') {
      this.userType = this.commonService.GetUserType();
    } else {
      //this.nevigateToLogin();
    }
  }
  nevigateToDashboad() {
    if (this.loginUsername !== null && this.loginUsername !== undefined && this.loginUsername !== '') {
      this.router.navigate(['cleanit/home/dashboard']);
    } else {
      this.nevigateToLogin();
    }
  }

  nevigateToLogin() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
