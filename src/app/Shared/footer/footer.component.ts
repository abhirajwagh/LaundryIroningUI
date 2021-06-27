import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserConstant } from 'src/app/Constants/Application.Constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loginUsername: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.loginUsername = sessionStorage.getItem(UserConstant.UserName);
  }

}
