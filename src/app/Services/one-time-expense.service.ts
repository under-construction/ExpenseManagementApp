import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneTimeExpense } from '../Models/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OneTimeExpenseService extends BaseService<OneTimeExpense> {

  constructor(http: HttpClient) { 
    
    super(http);
    this.controllerName = 'oneTimeExpense';
  }
}
