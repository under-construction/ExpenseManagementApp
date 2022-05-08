import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { OneTimeExpenseComponent } from './Components/one-time-expense/one-time-expense.component';
import { OneTimeIncomeComponent } from './Components/one-time-income/one-time-income.component';
import { RegularIncomeComponent } from './Components/regular-income/regular-income.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'oneTimeIncome', component: OneTimeIncomeComponent },
  { path: 'regularIncome', component: RegularIncomeComponent },
  { path: 'oneTimeExpense', component: OneTimeExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
