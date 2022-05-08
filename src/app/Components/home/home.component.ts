import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addOptions: string[] = ['One Time', 'Regular'];

  constructor() { }

  ngOnInit(): void {
  }

  dropdownItemClick(e: any) {
    switch (this.addOptions.indexOf(e.itemData)) {
      case 0:
        window.location.replace('../oneTimeIncome');
        break;
      case 1:
        window.location.replace('../regularIncome');
        break;
      default:
        break;
    }
  }

  resetClick() {
    
  }
}
