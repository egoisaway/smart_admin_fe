import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';


@NgModule({
  declarations: [
    ReportsComponent,
    StockChartComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ReportsModule { }
