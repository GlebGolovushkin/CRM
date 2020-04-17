import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessList } from './processes/processList.component';
import { DataService } from './shared/dataService';
import { GantChart } from './ganttChart/ganttChart';


@NgModule({
  declarations: [
    AppComponent,
        ProcessList,
        GantChart
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      HttpClientModule
  ],
    providers: [
        DataService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
