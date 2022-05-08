import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxDropDownButtonModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
