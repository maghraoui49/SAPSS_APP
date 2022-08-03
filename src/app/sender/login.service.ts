import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private isLoginFail! : boolean;


  getIsLoginFail(): boolean {
    return this.isLoginFail;
  }

  setIsLoginFail(value: boolean) {
    this.isLoginFail = value;
  }
}
