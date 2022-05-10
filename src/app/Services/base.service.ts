import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<TModel> implements IBaseService<TModel> {

  // generic base class for services that build and send requests to server.
  // keeps url and controller name as string.
  // uses HttpClient object to send CRUD requests. 

  baseUrl: string = '/api';
  controllerName!: string;

  constructor(private http: HttpClient) { }
  
  // request to get whole data from server
  GetAll(): Observable<TModel[]> {
    return this.http.get<TModel[]>(`${this.baseUrl}/${this.controllerName}`);
  }
  
  // request to get an entity by its id from server
  GetById(id: number): Observable<TModel> {
    return this.http.get<TModel>(`${this.baseUrl}/${this.controllerName}/${id}`);
  }
  
  // request to add an entity to server
  Insert(model: TModel): Observable<TModel> {
    return this.http.post<TModel>(`${this.baseUrl}/${this.controllerName}`, model);
  }
  
  // request to update an entity by its id in server
  Update(id: number, model: TModel): Observable<TModel> {
    return this.http.put<TModel>(`${this.baseUrl}/${this.controllerName}/${id}`, model);
  }

  // request to delete an entity from server
  Delete(id: number): Observable<TModel> {
    return this.http.delete<TModel>(`${this.baseUrl}/${this.controllerName}/${id}`);
  }
}

// object template for base service class
export interface IBaseService<TModel> {
  GetAll(): Observable<TModel[]>;
  GetById(id: number): Observable<TModel>;
  Insert(model: TModel): Observable<TModel>;
  Update(id: number, model: TModel): Observable<TModel>;
  Delete(id: number): Observable<TModel>;
}