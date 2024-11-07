import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChannelProgModel } from '../Model/ChannelProgModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelProgService extends BaseService{

  constructor(private http:HttpClient) 
  {
    super()
   }

   apiurl = this.url;
  // apiurl = 'https://localhost:7083/api';
  //apiurl2 = 'https://localhost:7083/api/ChannelProg/GetContentByChannelName';
  //fileurl = 'https://localhost:7083/api/FileManager/UploadImage?productcode=';

  GetAllChannelProg():Observable<ChannelProgModel[]>{
    return this.http.get<ChannelProgModel[]>(this.apiurl + '/ChannelProg/GetAll');
  }

  GetContent(inputdata: any){
    return this.http.post(this.apiurl+"/lessons/post",inputdata);
  }

  RemoveContent(ContentId: any){
    return this.http.delete(this.apiurl + '/ChannelProg/Remove?code=' + ContentId);
  }
  
  //Upload prifile Pic
  UploadFile2(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/FileManager/UploadImage?productcode=${productCode}`,
    formData,
    httpOptions);
  }

  UploadVideo(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/UploadVideo/UploadImage?productcode=554${productCode}`,
    formData,
    httpOptions);
  }

  // Get Profile Pic Path
  GetFilePath(code:any){
    return this.http.get(this.apiurl+'/Product/GetImage?productcode=ProfilePic_2015');
  }

  //Save path to database
  UpdateUser(id:any , inputdata: any){
    return this.http.put(this.apiurl+"/User/Update?code="+ id + "", inputdata);
  }

  CreateMaterial(inputdata: any) {
    return this.http.post(this.apiurl+"/ChannelProg/Create", inputdata);
  }
 
}