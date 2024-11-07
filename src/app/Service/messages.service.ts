import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagesModel } from '../Model/MessagesModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseService{

  constructor(private http:HttpClient) 
  {
    super()
  }

  apiurl = this.url;
  //apiurl='https://localhost:7083/api/Message'; 
  id = 10;

  GetAllMessages():Observable<MessagesModel[]>{
    return this.http.get<MessagesModel[]>(this.apiurl + '/Message/GetAll');
  }
  GetMessagesbyId(MessageId: any){
    return this.http.get(this.apiurl + '/Message/GetByCode?code=' + MessageId);
  }
  RemoveMessage(MessageId: any){
    return this.http.delete(this.apiurl + '/Message/Remove?code=' + MessageId);
  }
  UpdateMessage(inputdata: any){
    return this.http.put("/Message/Update?code="+ this.id + "", inputdata);
  }
  CreateMessage(inputdata: any) {
    return this.http.post(this.apiurl+"/Message/Create", inputdata);
  }
}
