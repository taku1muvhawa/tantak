import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportsModel } from '../Model/ReportsModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseService{

  constructor(private http:HttpClient) 
  { 
    super()
  }

  apiurl= this.url;
  //apiurl='https://localhost:7083/api/Report';
  id = 10;

  GetAllReports():Observable<ReportsModel[]>{
    return this.http.get<ReportsModel[]>(this.apiurl + '/reports');
  }
  GetReportsbyId(AssessmentId: any){
    return this.http.get(this.apiurl + '/Report/GetByCode?code=' + AssessmentId);
  }
  RemoveReport(AssessmentId: any){
    return this.http.delete(this.apiurl + '/Report/Remove?code=' + AssessmentId);
  }
  UpdateReport(inputdata: any){
    return this.http.put(this.apiurl+"/Report/Update?code="+ this.id + "", inputdata);
  }
  CreateReport(inputdata: any) {
    return this.http.post(this.apiurl+"/Report/Create", inputdata);
  }
  UploadPdf(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/AssPdf/UploadPdf?productcode=${productCode}`,
    formData,
    httpOptions);
  }
  GetDownloadPath(code:any){
    return this.http.get('${this.apiurl}/AssPdf/download?pdfcode='+code);
  }

}
