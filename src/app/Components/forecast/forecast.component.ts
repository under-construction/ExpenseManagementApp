import { Component, OnInit } from '@angular/core';
import { Frequency, OneTimeExpense, OneTimeIncome, RegularExpense, RegularIncome } from 'src/app/Models/models';
import { FrequencyService } from 'src/app/Services/frequency.service';
import { OneTimeExpenseService } from 'src/app/Services/one-time-expense.service';
import { OneTimeIncomeService } from 'src/app/Services/one-time-income.service';
import { RegularExpenseService } from 'src/app/Services/regular-expense.service';
import { RegularIncomeService } from 'src/app/Services/regular-income.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  // class that represents forecast screen.
  // allows user to see actual financial income and expense amounts at specific date.
  // reflects data in a pie chart with amounts.

  selectedDate: string | number | Date = new Date();
  totalOneTimeIncome!: number;
  totalOneTimeExpense!: number;
  totalRegularIncome!: number;
  totalRegularExpense!: number;
  overallBudget!: number;
  oneTimeIncomeList!: OneTimeIncome[];
  regularIncomeList!: RegularIncome[];
  oneTimeExpenseList!: OneTimeExpense[];
  regularExpenseList!: RegularExpense[];
  frequencyList!: Frequency[];
  chartDataSource!: any[];

  constructor(
    private oneTimeIncomeService: OneTimeIncomeService,
    private regularIncomeService: RegularIncomeService,
    private oneTimeExpenseService: OneTimeExpenseService,
    private regularExpenseService: RegularExpenseService,
    private frequencyService: FrequencyService
  ) { }

  ngOnInit(): void {
    this.getOneTimeIncomes();
    this.getRegularIncomes();
    this.getOneTimeExpenses();
    this.getRegularExpenses();
    this.getFrequencyList();
  }

  getOneTimeIncomes() {
    this.oneTimeIncomeService.GetAll()
    .subscribe(
      res => {
        this.oneTimeIncomeList = res;
      },
      err => console.log(err.messagew)
    );
  }

  getRegularIncomes() {
    this.regularIncomeService.GetAll()
    .subscribe(
      res => this.regularIncomeList = res,
      err => console.log(err.message)
    );
  }

  getOneTimeExpenses() {
    this.oneTimeExpenseService.GetAll()
    .subscribe(
      res => this.oneTimeExpenseList = res,
      err => console.log(err.message)
    );
  }

  getRegularExpenses() {
    this.regularExpenseService.GetAll()
    .subscribe(
      res => this.regularExpenseList = res,
      err => console.log(err.message)
    );
  }

  getFrequencyList() {
    this.frequencyService.GetAll()
    .subscribe(
      res => this.frequencyList = res,
      err => console.log(err.message)
    );
  }

  // method for reflecting data to form
  showAmounts() {
    this.calculateOneTimeIncomes(this.selectedDate);
    this.calculateOneTimeExpenses(this.selectedDate);
    this.forecastRegularIncomes(this.selectedDate);
    this.forecastRegularExpenses(this.selectedDate);
    this.getChartDataSource();
    this.calculateOverall();
  }

  // calculation method for overall budget (total income - total expense)
  calculateOverall() {
    this.overallBudget = this.totalOneTimeIncome + this.totalRegularIncome 
    - (this.totalOneTimeExpense + this.totalRegularExpense);
  }

  // method for creating an array to be used as pie chart data source
  private getChartDataSource() {
    this.chartDataSource = [
      {
        name: 'One Time Income',
        amount: this.totalOneTimeIncome,
      },
      {
        name: 'One Time Expense',
        amount: this.totalOneTimeExpense,
      },
      {
        name: 'Regular Income',
        amount: this.totalRegularIncome,
      },
      {
        name: 'Regular Expense',
        amount: this.totalRegularExpense,
      }
    ];
  }

  // this method basically adds regular income amounts to overall budget.
  // for each regular income, transaction dates are calculated and pushed into an array by using their frequency and number of repetition. then each transaction date is checked whether it is between today and selected date. if so, transaction amount is added to total regular income price. at last, total regular income price is assigned to the number box and shown on the screen.
  private forecastRegularIncomes(date: string | number | Date) {
    let regularIncome = 0;

    this.regularIncomeList.forEach(i => {
      let startDate = new Date(i.startDate);
      let daysCount = this.frequencyList.find(k => k.id === i.frequencyId)?.daysCount ?? 0;
      let regularIncomeDates = this.addDays(startDate, daysCount, i.repetitionNumber);

      regularIncome = regularIncomeDates.reduce((sum, k) =>
        this.isBetween(k, new Date(), new Date(date)) ?
        (sum + i.amount) : sum, regularIncome);
      });

      this.totalRegularIncome = regularIncome;
  }

  // same process with the preceding method but for regular expense amounts.
  private forecastRegularExpenses(date: string | number | Date) {
    let regularExpense = 0;

    this.regularExpenseList.forEach(i => {
      let startDate = new Date(i.startDate);
      let daysCount = this.frequencyList.find(k => k.id === i.frequencyId)?.daysCount ?? 0;
      let regularExpenseDates = this.addDays(startDate, daysCount, i.repetitionNumber);

      regularExpense = regularExpenseDates.reduce((sum, k) =>
        this.isBetween(k, new Date(), new Date(date)) ?
        (sum + i.amount) : sum, regularExpense);
      });

      this.totalRegularExpense = regularExpense;
  }

  // this method calculates total one time income price.
  // for each one time income, it is checked if their transaction date is before selected date. if so, entity amount is added to total one time income price. finally, total one time income price is assigned to the number box and shown on the screen.
  private calculateOneTimeIncomes(date: string | number | Date) {
    let totalOneTimeIncome = this.oneTimeIncomeList.reduce((sum, i) =>
    new Date(i.date) <= new Date(date) ? (sum + i.amount) : sum, 0);

    this.totalOneTimeIncome = totalOneTimeIncome;
  }

    // same process with the preceding method but for one time expense amounts.
  private calculateOneTimeExpenses(date: string | number | Date) {
    let totalOneTimeExpense = this.oneTimeExpenseList.reduce((sum, i) => 
    new Date(i.date) <= new Date(date) ? (sum + i.amount) : sum, 0);

    this.totalOneTimeExpense = totalOneTimeExpense;
  }

  // method for getting array consisting of successive dates due to the given number of days and repetition.
  // adds given number of days to the given date for repetition times and returns found dates as an array.
  private addDays(date: Date, days: number, repetition: number): Date[] {
    let dates: Date[] = [new Date(date)];
    for (let i = 0; i < repetition; i++) {
      date.setDate(date.getDate() + days);
      let newDate = _.cloneDeep(date);
      dates.push(newDate);
    }
    return dates;
  }

  // method for getting if a date is between two dates.
  private isBetween(date: Date, startDate: Date, endDate: Date): boolean {
    return moment(date).isBetween(startDate, endDate, null, '[]');
  }
}
