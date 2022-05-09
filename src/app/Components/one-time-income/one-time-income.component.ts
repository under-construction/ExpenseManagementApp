import { Component, OnInit } from '@angular/core';
import { OneTimeIncome } from 'src/app/Models/models';
import { OneTimeIncomeService } from 'src/app/Services/one-time-income.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-one-time',
  templateUrl: './one-time-income.component.html',
  styleUrls: ['./one-time-income.component.css']
})
export class OneTimeIncomeComponent extends BaseComponent<OneTimeIncome> {

  gridDataSource!: OneTimeIncome[];
  maxId!: number;

  constructor(
    private oneTimeIncomeService: OneTimeIncomeService
    ) { 
      super(oneTimeIncomeService); 
    }

  ngOnInit(): void {
    this.GetAll();
  }

  addClick() {
    this.getMaxId();
    this.Insert({ 
      id: this.maxId + 1, 
      description: this.formModel.description,
      amount: this.formModel.amount,
      date: new Date() });
  }

  resetClick() {
    this.reset();
  }

  rowUpdated(e: any) {
    let data = e.data;

    let model: OneTimeIncome = {
      id: data.id,
      description: data.description,
      amount: data.amount,
      date: new Date()
    };

    this.Update(model.id, model);
  }

  rowRemoved(e: any) {
    this.Delete(e.data.id);
  }

  rowInserted(e: any) {
    this.getMaxId();

    this.Insert({ 
      id: this.maxId + 1,
      description: e.data.description,
      amount: e.data.amount,
      date: this.formModel.date });
  }

  selectionChanged(e: any) {
    this.GetById(e.selectedRowsData[0].id);
  }

  private reset() {
    this.formModel.description = '';
    this.formModel.amount = 0;
  }

  private getMaxId() {
    this.maxId = Math.max(...this.modelList.map(i => i.id));
  }
}
