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

  // class that represents home screen
  // allows navigating other screens and shows basic data about number of entities.

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

  // this method works every time the page is initialized.
  ngOnInit(): void {
    this.getTotalOneTimeIncome();
    this.getTotalOneTimeExpense();
    this.getTotalRegularIncomes();
    this.getTotalRegularExpenses();
  }

  // 4 methods to get number of entities by subscribing the requests of services.

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
