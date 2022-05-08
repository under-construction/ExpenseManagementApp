import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneTimeIncome } from '../Models/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OneTimeIncomeService extends BaseService<OneTimeIncome> {

  constructor(http: HttpClient) { 
    
    super(http);
    this.controllerName = 'oneTimeIncome';
  }
}
