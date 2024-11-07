import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from '../Model/TransactionModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService{

  constructor(private http:HttpClient) 
  { 
    super()
  }


  apiurl=this.url;
  id = 10;

  GetAllTransactions():Observable<TransactionModel[]>{
    return this.http.get<TransactionModel[]>(this.apiurl + '/transactions');
  }
  GetTransactionbyId(UserId: any){
    return this.http.get(this.apiurl + '/transactions/' + UserId);
  }
  CreateTransaction(inputdata: any) {
    return this.http.post(this.apiurl+"/Transaction/Create", inputdata);
  }
  RemoveTransaction(userid: any){
    return this.http.delete(this.apiurl + '/Transaction/Remove?code=' + userid);
  }
  UpdateTransaction(inputdata: any){
    return this.http.put(this.apiurl+"/Transaction/Update?code="+ this.id + "", inputdata);
  }
}