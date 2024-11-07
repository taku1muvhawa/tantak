import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedbackModel } from '../Model/FeedbackModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

  constructor(private http:HttpClient)
  {
    super()
  }

  apiurl = this.url;
  //apiurl='https://localhost:7083/api/Feedback';
  id = 10;

  GetAllFeedbacks():Observable<FeedbackModel[]>{
    return this.http.get<FeedbackModel[]>('https://localhost:7083/api/Feedback/GetAll');
  }
  GetFeedbacksbyId(FeedbackId: any){
    return this.http.get('https://localhost:7083/api/Feedback/GetByCode?code=' + FeedbackId);
  }
  RemoveFeedback(FeedbackId: any){
    return this.http.delete(this.apiurl + '/Feedback/Remove?code=' + FeedbackId);
  }
  UpdateFeedback(inputdata: any){
    return this.http.put(this.apiurl+"/Feedback/Update?code="+ this.id + "", inputdata);
  }
  CreateFeedback(inputdata: any) {
    return this.http.post(this.apiurl+"/Feedback/Create", inputdata); 
  }
  UploadPdf(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/AssPdf/UploadPdf?productcode=${productCode}`,
    formData,
    httpOptions);
  }
  GetDownloadPath(code:any){
    return this.http.get(`${this.apiurl}/AssPdf/download?pdfcode=${code}`);
    // https://localhost:7083/api/AssPdf/download?pdfcode=5003
  }

}
