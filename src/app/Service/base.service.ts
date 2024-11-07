import { environment } from '../../enviroment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {  

  protected url: string = environment.TakuAngular.url;

  constructor() { }
}
