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
    debugger;
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
}
