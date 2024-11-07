import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VoucherModel } from '../Model/VoucherModel';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService extends BaseService {

  constructor(private http:HttpClient) 
  { 
    super()
  }

  apiurl = this.url;
  //apiurl='https://localhost:7083/api/Voucher';
  id = 10;

  GetAllVouchers():Observable<VoucherModel[]>{
    return this.http.get<VoucherModel[]>(this.apiurl + '/Voucher/GetAll');
  }
  GetVoucherByyId(ChannelId: any){
    return this.http.get(this.apiurl + '/Voucher/GetByCode?code=' + ChannelId); 
  }
  GetByVoucher(inputdata: any){
    return this.http.post(this.apiurl+"/Voucher/GetByVoucher",inputdata);
  }
  RemoveVoucher(ChannelId: any){
    return this.http.delete(this.apiurl + '/Voucher/Remove?code=' + ChannelId);
  }
  UpdateVoucher(inputdata: any, id:number){
    return this.http.put(this.apiurl + "/Voucher/Update?code="+ id + "", inputdata);
  }
}
