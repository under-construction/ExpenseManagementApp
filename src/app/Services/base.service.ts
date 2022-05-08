import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<TModel> implements IBaseService<TModel> {

  baseUrl: string = '/api';
  controllerName!: string;

  constructor(private http: HttpClient) { }
  
  GetAll(): Observable<TModel[]> {
    return this.http.get<TModel[]>(`${this.baseUrl}/${this.controllerName}`);
  }
  
  GetById(id: number): Observable<TModel> {
    return this.http.get<TModel>(`${this.baseUrl}/${this.controllerName}/${id}`);
  }
  
  Insert(model: TModel): Observable<TModel> {
    return this.http.post<TModel>(`${this.baseUrl}/${this.controllerName}`, model);
  }
  
  Update(id: number, model: TModel): Observable<TModel> {
    return this.http.put<TModel>(`${this.baseUrl}/${this.controllerName}/${id}`, model);
  }

  Delete(id: number): Observable<TModel> {
    return this.http.delete<TModel>(`${this.baseUrl}/${this.controllerName}/${id}`);
  }
}

export interface IBaseService<TModel> {
  GetAll(): Observable<TModel[]>;
  GetById(id: number): Observable<TModel>;
  Insert(model: TModel): Observable<TModel>;
  Update(id: number, model: TModel): Observable<TModel>;
  Delete(id: number): Observable<TModel>;
}