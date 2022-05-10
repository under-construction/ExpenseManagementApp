import { Component, OnInit } from '@angular/core';
import { OneTimeIncome } from 'src/app/Models/models';
import { OneTimeExpenseService } from 'src/app/Services/one-time-expense.service';
import { OneTimeIncomeService } from 'src/app/Services/one-time-income.service';
import { RegularExpenseService } from 'src/app/Services/regular-expense.service';
import { RegularIncomeService } from 'src/app/Services/regular-income.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addOptions: string[] = ['One Time', 'Regular'];
  incomeList!: OneTimeIncome[];
  countOneTimeInc!: number;
  countOneTimeExp!: number;
  countRegularInc!: number;
  countRegularExp!: number;

  constructor(
    private oneTimeIncomeService: OneTimeIncomeService,
    private oneTimeExpenseService: OneTimeExpenseService,
    private regularIncomeService: RegularIncomeService,
    private regularExpenseService: RegularExpenseService
    ) {

     }

  ngOnInit(): void {
    this.getTotalOneTimeIncome();
    this.getTotalOneTimeExpense();
    this.getTotalRegularIncomes();
    this.getTotalRegularExpenses();
  }

  dropdownItemClick(e: any) {
    switch (this.addOptions.indexOf(e.itemData)) {
      case 0:
        window.location.replace(`${'../oneTime'}${e.element.textContent}`);
        break;
      case 1:
        window.location.replace(`${'../regular'}${e.element.textContent}`);
        break;
      default:
        break;
    }
  }

  getTotalOneTimeIncome() {
    this.oneTimeIncomeService.GetAll()
    .subscribe(
      res => {
        this.countOneTimeInc = res.length;
      },
      err => {
        console.log(err.message);
      }
    );
  }

  getTotalOneTimeExpense() {
    this.oneTimeExpenseService.GetAll()
    .subscribe(
      res => {
        this.countOneTimeExp = res.length;
      },
      err => {
        console.log(err.message);
      }
    );
  }

  getTotalRegularIncomes() {
    this.regularIncomeService.GetAll()
    .subscribe(
      res => {
        this.countRegularInc = res.length;
      },
      err => {
        console.log(err.message);
      }
    );
  }

  getTotalRegularExpenses() {
    this.regularExpenseService.GetAll()
    .subscribe(
      res => {
        this.countRegularExp = res.length;
      },
      err => {
        console.log(err.message);
      }
    );
  }
}
