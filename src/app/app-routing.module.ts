import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { OneTimeIncomeComponent } from './Components/one-time-income/one-time-income.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'oneTimeIncome', component: OneTimeIncomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
