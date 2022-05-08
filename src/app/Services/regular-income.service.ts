import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegularIncome } from '../Models/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RegularIncomeService extends BaseService<RegularIncome> {

  constructor(http: HttpClient) { 
    
    super(http);
    this.controllerName = 'regularIncome';
  }
}
