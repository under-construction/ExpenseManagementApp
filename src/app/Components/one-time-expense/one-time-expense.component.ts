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
  // class that represents one time expense screen.
  // allows user to list and edit one time expenses on a form or a datagrid.

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

  // method to be initialized when the add button is clicked.
  // inserts new entity to the mock database.
  addClick() {
    this.getMaxId();
    this.Insert({ 
      id: this.maxId + 1, 
      description: this.formModel.description,
      amount: this.formModel.amount,
      date: this.formModel.date });
  }

  // method to be initialized when the reset button is clicked.
  // resets the form.
  resetClick() {
    this.reset();
  }

  // method to be initialized when a row is updated inside datagrid.
  // triggered by datagrid event.
  // allows inline editing.
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

  // method to be initialized when a row is updated inside datagrid.
  // triggered by datagrid event.
  // allows inline editing.
  rowRemoved(e: any) {
    this.Delete(e.data.id);
  }

  // method to be initialized when a row is deleted inside datagrid.
  // triggered by datagrid event.
  // allows inline editing.
  rowInserted(e: any) {
    this.getMaxId();

    this.Insert({ 
      id: this.maxId + 1,
      description: e.data.description,
      amount: e.data.amount,
      date: e.data.date });
  }

  // method to be initialized when a row is selected inside datagrid.
  // triggered by datagrid event.
  // allows inline editing.
  selectionChanged(e: any) {
    this.GetById(e.selectedRowsData[0].id);
  }

  private reset() {
    this.formModel.description = '';
    this.formModel.amount = 0;
    this.formModel.date = 0;
  }

  // allows auto increment of id columns for entities.
  private getMaxId() {
    this.maxId = Math.max(...this.modelList.map(i => i.id));
  }
}
