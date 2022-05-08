import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegularExpense } from '../Models/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RegularExpenseService extends BaseService<RegularExpense> {

  constructor(http: HttpClient) { 
    
    super(http);
    this.controllerName = 'regularExpense';
  }
}
