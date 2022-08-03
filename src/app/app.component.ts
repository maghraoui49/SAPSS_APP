import { Component } from '@angular/core';
import {LoginService} from "./sender/login.service";
import {Router} from "@angular/router";


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SAPPS_APP';
  isLoginFail! : boolean;
  constructor(private sender : LoginService) {


  }

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit(): void {
    this.isLoginFail=this.sender.getIsLoginFail();
    console.log(this.isLoginFail)
  }
}
