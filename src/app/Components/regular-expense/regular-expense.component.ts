import { Component, OnInit } from '@angular/core';
import { RegularExpense } from 'src/app/Models/models';
import { RegularExpenseService } from 'src/app/Services/regular-expense.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-regular-expense',
  templateUrl: './regular-expense.component.html',
  styleUrls: ['./regular-expense.component.css']
})
export class RegularExpenseComponent extends BaseComponent<RegularExpense> {

  frequencyOpt: string[] = ['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly']
  maxId!: number;

  constructor(
    private regularExpenseService: RegularExpenseService
    ) { 
      super(regularExpenseService) 
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
      frequency: this.formModel.frequency });
  }

  resetClick() {
    this.reset();
  }

  rowUpdated(e: any) {
    let data = e.data;

    let model: RegularExpense = {
      id: data.id,
      description: data.description,
      amount: data.amount,
      frequency: data.frequency
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
      frequency: e.data.frequency });
  }

  selectionChanged(e: any) {
    this.GetById(e.selectedRowsData[0].id);
  }

  private reset() {
    this.formModel.description = '';
    this.formModel.amount = 0;
    this.formModel.frequency = '';
  }

  private getMaxId() {
    this.maxId = Math.max(...this.modelList.map(i => i.id));
  }
}
