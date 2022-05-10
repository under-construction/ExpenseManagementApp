import { Component } from '@angular/core';
import { OneTimeExpense } from 'src/app/Models/models';
import { OneTimeExpenseService } from 'src/app/Services/one-time-expense.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-one-time-expense',
  templateUrl: './one-time-expense.component.html',
  styleUrls: ['./one-time-expense.component.css']
})
export class OneTimeExpenseComponent extends BaseComponent<OneTimeExpense> {

  gridDataSource!: OneTimeExpense[];
  maxId!: number;

  constructor(
    private oneTimeExpenseService: OneTimeExpenseService
    ) { 
      super(oneTimeExpenseService); 
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
      date: this.formModel.date });
  }

  resetClick() {
    this.reset();
  }

  rowUpdated(e: any) {
    let data = e.data;

    let model: OneTimeExpense = {
      id: data.id,
      description: data.description,
      amount: data.amount,
      date: data.date
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
      date: e.data.date });
  }

  selectionChanged(e: any) {
    this.GetById(e.selectedRowsData[0].id);
  }

  private reset() {
    this.formModel.description = '';
    this.formModel.amount = 0;
    this.formModel.date = 0;
  }

  private getMaxId() {
    this.maxId = Math.max(...this.modelList.map(i => i.id));
  }
}
