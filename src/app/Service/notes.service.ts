import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesModel } from '../Model/NotesModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService{

  constructor(private http:HttpClient) 
  { 
    super()
  }

  apiurl = this.url;
  //apiurl = 'https://localhost:7083/api/NotesMath';
  id = 10;

  GetAllNotes():Observable<NotesModel[]>{
    return this.http.get<NotesModel[]>(this.apiurl + '/notes');
  }
  GetNotesbyId(NotesId: any){
    return this.http.get(this.apiurl + '/NotesMath/GetByCode?code=' + NotesId);
  }
  RemoveNotes(NotesId: any){
    return this.http.delete(this.apiurl + '/NotesMath/Remove?code=' + NotesId);
  }
  UpdateNotes(inputdata: any){
    return this.http.put("/NotesMath/Update?code="+ this.id + "", inputdata);
  }
  UploadPdf(productCode : any, formData:any, httpOptions:any){
    return this.http.post(`${this.apiurl}/AssPdf/UploadPdf?productcode=${productCode}`,
    formData,
    httpOptions);
  }
  AddBook(inputdata: any) {
    return this.http.post(this.apiurl+"/NotesMath/Create", inputdata);
  }

}
