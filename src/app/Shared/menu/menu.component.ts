import { Component, Input, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
