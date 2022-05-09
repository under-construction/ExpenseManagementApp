import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequencyComponent } from './Components/frequency/frequency.component';
import { HomeComponent } from './Components/home/home.component';
import { OneTimeExpenseComponent } from './Components/one-time-expense/one-time-expense.component';
import { OneTimeIncomeComponent } from './Components/one-time-income/one-time-income.component';
import { RegularExpenseComponent } from './Components/regular-expense/regular-expense.component';
import { RegularIncomeComponent } from './Components/regular-income/regular-income.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'oneTimeIncome', component: OneTimeIncomeComponent },
  { path: 'regularIncome', component: RegularIncomeComponent },
  { path: 'oneTimeExpense', component: OneTimeExpenseComponent },
  { path: 'regularExpense', component: RegularExpenseComponent },
  { path: 'frequency', component: FrequencyComponent },
  { path: '',  redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
