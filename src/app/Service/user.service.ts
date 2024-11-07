import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Base64 } from '@syncfusion/ej2-angular-documenteditor';
//import { buffer } from 'rxjs';
import { Buffer } from 'buffer';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient) {
    super()
  }

  apiurl = this.url;
  //role = this.GetRole();

  // NEW

  Login(inputdata: any) {
    return this.http.post(this.apiurl+"/onboarding/login", inputdata);
  }

  //END

  ProceedLogin(inputdata: any) {
    return this.http.post(this.apiurl+"/Authorize/GenerateToken", inputdata);
  }

  IsLoogedIn() {
    return localStorage.getItem('token') != null;
  }

  GetToken() {
    return localStorage.getItem('token') != null ? localStorage.getItem("token") : '';
  }
  Registration(inputdata: any) {
    return this.http.post(this.apiurl+"/onboarding", inputdata);
  }

  UserName() {
    return localStorage.getItem('name') != null;
  }
  
  GetRole() {
    var token = this.GetToken();
    if (token != null) {
      var extractdata = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return extractdata.role;
    }else{
      return '';
    }
  }
  
  GetEmail(){
    var token = this.GetToken();
    if (token != null) {
      var extractdata = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return extractdata.email;
    }else{
      return '';
    }
  }
}
