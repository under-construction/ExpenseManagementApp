import { Component } from '@angular/core';
import { Frequency, OneTimeExpense } from 'src/app/Models/models';
import { FrequencyService } from 'src/app/Services/frequency.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent extends BaseComponent<Frequency> {

  // class that represents frequency editing screen.
  // allows adding, updating and removing new frequency option to be picked when a recurring transaction is created.

  gridDataSource!: OneTimeExpense[];
  maxId!: number;

  constructor(
    private frequencyService: FrequencyService
    ) { 
      super(frequencyService); 
    }

  ngOnInit(): void {
    this.GetAll();
  }

  rowUpdated(e: any) {
    let data = e.data;

    let model: Frequency = {
      id: data.id,
      description: data.description,
      daysCount: data.daysCount
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
      daysCount: e.data.daysCount });
  }

  selectionChanged(e: any) {
    this.GetById(e.selectedRowsData[0].id);
  }

  private getMaxId() {
    this.maxId = Math.max(...this.modelList.map(i => i.id));
  }
}
