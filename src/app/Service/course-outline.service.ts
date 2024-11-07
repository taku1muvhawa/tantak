import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseOutlineModel } from '../Model/CourseOutlineModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CourseOutlineService extends BaseService {

  constructor(private http:HttpClient) 
  { 
    super()
  }

  apiurl = this.url;
  //apiurl='https://localhost:7083/api/CourseOutline';
  id = 10;

  GetAllCourseOutline():Observable<CourseOutlineModel[]>{
    return this.http.get<CourseOutlineModel[]>(this.apiurl + '/topics');
  }
  GetUserbyId(UserId: any){
    return this.http.get(this.apiurl + '/CourseOutline/GetByCode?code=' + UserId);
  }
  CreateCourseOutline(inputdata: any) {
    return this.http.post(this.apiurl+"/CourseOutline/Create", inputdata);
  }
  RemoveCourseOutline(userid: any){
    return this.http.delete(this.apiurl + '/CourseOutline/Remove?code=' + userid);
  }
  UpdateCourseOutline(inputdata: any){
    return this.http.put(this.apiurl+"/CourseOutline/Update?code="+ this.id + "", inputdata);
  }

}