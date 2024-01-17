import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtyReportChartComponent } from './specialty-report-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [SpecialtyReportChartComponent],
  imports: [CommonModule, NgChartsModule],
  exports: [SpecialtyReportChartComponent],
})
export class SpecialtyReportChartModule {}
