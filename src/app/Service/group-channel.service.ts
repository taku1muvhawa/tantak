import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChannelModel } from '../Model/ChannelModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GroupChannelService extends BaseService{

  constructor(private http:HttpClient) 
  { 
    super()
  }

  apiurl = this.url;
  // apiurl='https://localhost:7083/api';
  // apiurl='http://localhost:3003';
  id = 10;

  GetAllChannels():Observable<ChannelModel[]>{
    return this.http.get<ChannelModel[]>(this.apiurl + '/colleges');
  }
  GetChannelsbyId(ChannelId: any){
    return this.http.get(this.apiurl + '/channels/' + ChannelId);
  }
  RemoveChannel(ChannelId: any){
    return this.http.delete(this.apiurl + '/channels/' + ChannelId);
  }
  UpdateChannel(inputdata: any){
    return this.http.put(this.apiurl + "/channels/"+ this.id + "", inputdata);
  }
}
