import { Component, OnInit } from '@angular/core';
import { Frequency, RegularIncome } from 'src/app/Models/models';
import { FrequencyService } from 'src/app/Services/frequency.service';
import { RegularIncomeService } from 'src/app/Services/regular-income.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-regular-income',
  templateUrl: './regular-income.component.html',
  styleUrls: ['./regular-income.component.css']
})
export class RegularIncomeComponent extends BaseComponent<RegularIncome> {

  frequencyOpt!: Frequency[];
  maxId!: number;

  constructor(
    private regularIncomeService: RegularIncomeService,
    private frequencyService: FrequencyService
    ) { 
      super(regularIncomeService) 
    }

  ngOnInit(): void {
    this.GetAll();
    this.getFrequencyDataSource();
  }

  addClick() {
    this.getMaxId();
    this.Insert({ 
      id: this.maxId + 1, 
      description: this.formModel.description,
      amount: this.formModel.amount,
      frequencyId: this.formModel.frequencyId,
      startDate: this.formModel.startDate,
      repetitionNumber: this.formModel.repetitionNumber });
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
      frequencyId: data.frequencyId,
      startDate: data.startDate,
      repetitionNumber: data.repetitionNumber
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
      frequencyId: e.data.frequencyId,
      startDate: e.data.startDate,
      repetitionNumber: e.data.repetitionNumber });
  }

  selectionChanged(e: any) {
    this.GetById(e.selectedRowsData[0].id);
  }

  private reset() {
    this.formModel.description = '';
    this.formModel.amount = 0;
    this.formModel.frequencyId = 0;
    this.formModel.repetitionNumber = 0;
  }

  private getMaxId() {
    this.maxId = Math.max(...this.modelList.map(i => i.id));
  }

  private getFrequencyDataSource() {
    this.frequencyService.GetAll()
    .subscribe(
      res => this.frequencyOpt = res,
      err => console.log(err.message)
    )
  }
}
