import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssessmentModel } from '../Model/AssessmentModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService extends BaseService {

  constructor(private http:HttpClient) 
  {
    super()
   }
  
   apiurl = this.url;
  //apiurl='https://localhost:7083/api/AssAccounts'; 
  id = 10;

  GetAllAssessments():Observable<AssessmentModel[]>{
    return this.http.get<AssessmentModel[]>(this.apiurl +'/assignments');
  }
  GetAssessmentsbyId(AssessmentId: any){
    return this.http.get(this.apiurl + '/AssAccounts/GetByCode?code=' + AssessmentId);
  }
  RemoveAssessment(AssessmentId: any){
    return this.http.delete(this.apiurl + '/assignments/' + AssessmentId);
  }
  UpdateAssessment(inputdata: any){
    return this.http.put("/AssAccounts/Update?code="+ this.id + "", inputdata);
  }
  CreateAssessment(inputdata: any) {
    return this.http.post(this.apiurl+"/AssAccounts/Create", inputdata);
  }
  UploadPdf(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/AssPdf/UploadPdf?productcode=${productCode}`,
    formData,
    httpOptions);
  }
  GetDownloadPath(code:any){
    return this.http.get(this.apiurl+'/AssPdf/download?pdfcode='+code);
  }
}
