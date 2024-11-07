import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Model/UserModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService extends BaseService{

  constructor(private http:HttpClient) 
  { 
    super()
  }

  apiurl=this.url;
  // apiurl='https://localhost:7083/api';
  id = 10;

  GetAllUser():Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.apiurl + '/User/GetAll');
  }
  GetUserbyId(UserId: any){
    return this.http.get(this.apiurl + '/users/' + UserId);
  }
  RemoveUser(userid: any){
    return this.http.delete(this.apiurl + '/User/Remove?code=' + userid);
  }
  UpdateUser(inputdata: any){
    return this.http.put(this.apiurl+"/User/Update?code="+ this.id + "", inputdata);
  }

  GetAllRoles(){
    return this.http.get(this.apiurl+"/Role/GetAll");
  }

  GetUserInfo(inputdata:any){
    return this.http.post(this.url+"/User/GetAUserDetails",inputdata);
  }

  GetUserByEmail(inputdata:any){
    return this.http.post(this.apiurl+"/User/GetByEmail",inputdata);
  }
}
