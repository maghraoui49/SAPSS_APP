import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../sender/login.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //authvalide : boolean
  username!: string
  password!: string
  isLoginFail: any= false;

  constructor(private app :AppComponent, private sender : LoginService, private router :Router) { }

  ngOnInit(): void {
  }

  checkauth() {
    if (this.username =='ebx_admin' && this.password=='ebx_admin'){
      this.isLoginFail =false ;
      this.sender.setIsLoginFail(true);
      this.router.navigate(['/dashboard']);
      this.app.ngOnInit();


    }

    else {
      this.isLoginFail = true;
      this.username= '';
      this.password='';
      this.sender.setIsLoginFail(false);
    }
  }

}
