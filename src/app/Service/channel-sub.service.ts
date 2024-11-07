import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChannelModel } from '../Model/ChannelModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelSubService extends BaseService {

  constructor(private http:HttpClient) 
  {
    super()
   }

   apiurl=this.url;
  // apiurl='https://localhost:7083/api/ChannelSub';
  // apiurl='https://localhost:7083/api';   // http://localhost:3003/level
  id = 10;

  GetAllChannels():Observable<ChannelModel[]>{
    return this.http.get<ChannelModel[]>(this.apiurl + '/level');
  }
  GetChannelsbyId(ChannelId: any){
    return this.http.get(this.apiurl + '/ChannelSub/GetByCode?code=' + ChannelId); 
  }
  GetChannelsbyInstitution(id: any){
    console.log(id);
    return this.http.get(this.apiurl + "/courses/"+id);
  }
  GetCourses(id: any){
    console.log(id);
    return this.http.get(this.apiurl + "/courses/college/"+id);
  }
  GetModules(id: any){
    return this.http.get(this.apiurl + "/modules/course/"+id);
  }
  CreateChannel(inputdata: any) {
    return this.http.post(this.apiurl+"/ChannelSub/Create", inputdata);
  }
  RemoveChannel(ChannelId: any){
    return this.http.delete(this.apiurl + '/ChannelSub/Remove?code=' + ChannelId);
  }
  UpdateChannel(inputdata: any){
    return this.http.put(this.apiurl + "/ChannelSub/Update?code="+ this.id + "", inputdata);
  }
  UploadPhoto(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/FileManager/UploadImage?productcode=${productCode}`,
    formData,
    httpOptions);
  }
}
