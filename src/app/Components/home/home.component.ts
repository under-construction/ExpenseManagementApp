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
  totalOneTimeIncome!: number;
  totalRegularIncome!: number;
  totalOneTimeExpense!: number;
  totalRegularExpense!: number;

  constructor(
    private oneTimeIncomeService: OneTimeIncomeService,
    private oneTimeExpenseService: OneTimeExpenseService
    ) {

     }

  ngOnInit(): void {
    this.getTotalOneTimeIncome();
    this.getTotalOneTimeExpense();
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

  resetClick() {
    
  }

  getTotalOneTimeIncome() {
    this.oneTimeIncomeService.GetAll()
    .subscribe(
      res => {
        this.totalOneTimeIncome = res.reduce((sum, i) => sum + i.amount, 0);
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
        this.totalOneTimeExpense = res.reduce((sum, i) => sum + i.amount, 0);
      },
      err => {
        console.log(err.message);
      }
    );
  }
}
