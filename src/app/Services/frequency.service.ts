import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Frequency } from '../Models/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService extends BaseService<Frequency> {

  constructor(http: HttpClient) { 
    
    super(http);
    this.controllerName = 'frequency';
  }
}
