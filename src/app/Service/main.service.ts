import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChannelModel } from '../Model/ChannelModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MainService extends BaseService {

  constructor(private http: HttpClient) {
    super()
  }

  apiurl = this.url;

  GetCourses(id: any) {
    console.log(id);
    return this.http.get(this.apiurl + "/courses/college/" + id);
  }
  GetModules(id: any) {
    return this.http.get(this.apiurl + "/modules/course/" + id);
  }
  CheckSubscription(courseId: any, userId: any) {
    return this.http.get(this.apiurl + "/subscriptions/student/" + userId + "/" + courseId);
  }

  GetLessons(modID: any) {
    return this.http.get(this.apiurl + "/lessons/mod/" + modID);
  }

  GetAssignments(modID: any) {
    return this.http.get(this.apiurl + "/assignments/mod/" + modID);
  }
  DeleteAssignment(id: any) {
    return this.http.delete(this.apiurl + "/assignments/" + id);
  }

  GetNotes(modID: any) {
    return this.http.get(this.apiurl + "/notes/mod/" + modID);
  }
  DeleteNotes(id: any) {
    return this.http.delete(this.apiurl + "/notes/" + id);
  }

  GetResults(modID: any, stuID: any) {
    return this.http.get(this.apiurl + "/results/mod/" + modID + "/" + stuID);
  }
  DeleteResults(id: any) {
    return this.http.delete(this.apiurl + "/results/" + id);
  }
  
  GetSubmittedAssignments(modID: any, stuID: any) {
    return this.http.get(this.apiurl + "/feedback/submitted/" + modID + "/" + stuID);
  }
  GetMarkedAssignments(modID: any, stuID: any) {
    return this.http.get(this.apiurl + "/feedback/marked/" + modID + "/" + stuID);
  }
  DeleteFeedback(id: any) {
    return this.http.delete(this.apiurl + "/feedback/" + id);
  }

}
