import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChannelModel } from '../Model/ChannelModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService extends BaseService{

  constructor(private http:HttpClient) 
  {
    super()
   }

   apiurl = this.url;
  //apiurl='https://localhost:7083/api/Channel';
  id = 10;

  GetAllChannels():Observable<ChannelModel[]>{
    return this.http.get<ChannelModel[]>(this.apiurl + '/Channel/GetAll');
  }
  GetChannelsbyId(ChannelId: any){
    return this.http.get(this.apiurl + '/Channel/GetByCode?code=' + ChannelId);
  }
  GetChannelsbyInstitution(inputdata: any){
    return this.http.post(this.apiurl+"/Channel/GetChannelByName",inputdata);
  }
  CreateChannel(inputdata: any) {
    return this.http.post(this.apiurl+"/Channel/Create", inputdata);
  }
  RemoveChannel(ChannelId: any){
    return this.http.delete(this.apiurl + '/Channel/Remove?code=' + ChannelId);
  }
  UpdateChannel(inputdata: any){
    return this.http.put(this.apiurl+"/Channel/Update?code="+ this.id + "", inputdata);
  }
  UploadPhoto(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/FileManager/UploadImage?productcode=${productCode}`,
    formData,
    httpOptions);
  }
}
