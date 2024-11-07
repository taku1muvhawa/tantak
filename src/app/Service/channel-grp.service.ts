import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChannelGrpModel } from '../Model/ChannelGrp';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelGrpService extends BaseService {

  constructor(private http:HttpClient) 
  {
    super()
   }

  // apiurl = this.url; 
  apiurl='https://localhost:7083/api';
  id = 10;

  GetAllChannelGrps():Observable<ChannelGrpModel[]>{
    return this.http.get<ChannelGrpModel[]>(this.apiurl + '/GrpChannel/GetAll');
  }
  GetChannelGrpById(ChannelGrpId: any){
    return this.http.get(this.apiurl + '/GrpChannel/GetByCode?code=' + ChannelGrpId);
  }
  RemoveChannelGrp(ChannelGrpId: any){
    return this.http.delete(this.apiurl + '/GrpChannel/Remove?code=' + ChannelGrpId);
  }
  UpdateChannelGrp(inputdata: any){
    return this.http.put("/GrpChannel/Update?code="+ this.id + "", inputdata);
  }
  CreateChannelGrp(inputdata: any) {
    return this.http.post(this.apiurl+"/GrpChannel/Create", inputdata);
  }
  UploadPhoto(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/FileManager/UploadImage?productcode=${productCode}`,
    formData,
    httpOptions);
  }
}
