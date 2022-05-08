import { Directive } from '@angular/core';
import { BaseService } from 'src/app/Services/base.service';

@Directive()
export class BaseComponent<TModel> {

  formModel: TModel = {} as TModel;
  modelList: TModel[] = [];

  constructor(
    private baseService: BaseService<TModel>
    ) { }

  GetAll() {
    this.baseService.GetAll()
    .subscribe(
      res => {
        this.modelList = res;
      },
      err => {
        console.log(err.message);
      }
    )
  }

  GetById(id: number) {
    this.baseService.GetById(id)
    .subscribe(
      res => {
        this.formModel = res;
      },
      err => {
        console.log(err.message);
      }
    )
  }

  Insert(model: TModel) {
    this.baseService.Insert(model)
    .subscribe(
      () => {
        this.GetAll();
      },
      err => {
        console.log(err.message);
      }
    )
  }

  Update(id: number, model: TModel) {
    this.baseService.Update(id, model)
    .subscribe(
      () => {
        this.GetAll();
      },
      err => {
        console.log(err.message);
      }
    )
  }

  Delete(id: number) {
    this.baseService.Delete(id)
    .subscribe(
      res => {
        this.GetAll();
      },
      err => {
        console.log(err.message);
      }
    )
  }
}