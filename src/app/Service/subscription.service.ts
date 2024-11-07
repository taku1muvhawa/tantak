import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubscriptionModel } from '../Model/SubscriptionModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService{

  constructor(private http:HttpClient) 
  { 
    super()
  }

  apiurl = this.url;
  // apiurl='https://localhost:7083/api';
  id = 10;


   CreateSubscription(inputdata: any) {
    return this.http.post(this.apiurl+"/Subscription/Create", inputdata);
  }
  GetAllChannels():Observable<SubscriptionModel[]>{
    return this.http.get<SubscriptionModel[]>(this.apiurl + '/Subscription/GetAll');
  }
  GetSubsciptionsbyId(ChannelId: any){
    return this.http.get(this.apiurl + '/Subscription/GetByCode?code=' + ChannelId); 
  }
  GetSubsciptionsbyEmail(inputdata: any){
    return this.http.get(this.apiurl+"/subscriptions/email/"+inputdata.email);
  }
  GetSubsciptionsbyEmailandChannel(inputdata: any){
    return this.http.post(this.apiurl+"/Subscription/GetChannelByNameandForm",inputdata);
  }
  RemoveSubsciption(ChannelId: any){
    return this.http.delete(this.apiurl + '/Subscription/Remove?code=' + ChannelId);
  }
  UpdateChannel(inputdata: any){
    return this.http.put(this.apiurl + "/Subscription/Update?code="+ this.id + "", inputdata);
  }
}
