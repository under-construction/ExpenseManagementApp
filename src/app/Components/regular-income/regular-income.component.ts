import { Component, OnInit } from '@angular/core';
import { RegularIncome } from 'src/app/Models/models';
import { RegularIncomeService } from 'src/app/Services/regular-income.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-regular-income',
  templateUrl: './regular-income.component.html',
  styleUrls: ['./regular-income.component.css']
})
export class RegularIncomeComponent extends BaseComponent<RegularIncome> {

  frequencyOpt: string[] = ['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly']

  constructor(
    private regularIncomeService: RegularIncomeService
    ) { 
      super(regularIncomeService) 
    }

  ngOnInit(): void {
    this.GetAll();
  }

  addClick() {
    this.Insert({ 
      id: this.modelList.length + 1, 
      description: this.formModel.description,
      amount: this.formModel.amount,
      frequency: this.formModel.frequency });
  }

  resetClick() {
    this.reset();
  }

  rowUpdated(e: any) {
    let data = e.data;

    let model: RegularIncome = {
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
    this.Insert({ 
      id: this.modelList.length + 1,
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
}
