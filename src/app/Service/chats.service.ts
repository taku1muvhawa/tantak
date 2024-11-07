import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactModel } from '../Model/ContactModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService extends BaseService{

  constructor(private http:HttpClient) 
  { 
    super()
  }

  apiurl = this.url;
  //apiurl='https://localhost:7083/api/Contact'; 
  id = 10;

  GetAllContacts():Observable<ContactModel[]>{
    return this.http.get<ContactModel[]>(this.apiurl + '/Contact/GetAll');
  }
  GetContactsbyId(ContactId: any){
    return this.http.get(this.apiurl + '/Contact/GetByCode?code=' + ContactId);
  }
  RemoveContact(ContactId: any){
    return this.http.delete(this.apiurl + '/Contact/Remove?code=' + ContactId);
  }
  UpdateContact(id:number, inputdata: any){
    return this.http.put(this.apiurl+"/Contact/Update?code="+ id + "", inputdata);
  }
  CreateContact(inputdata: any) {
    return this.http.post(this.apiurl+"/Contact/Create", inputdata);
  }
  GetContactByEmail(inputdata:any){
    return this.http.post(this.apiurl+"/Contact/GetByEmail",inputdata);
  }
}
