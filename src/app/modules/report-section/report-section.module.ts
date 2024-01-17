import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportSectionRoutingModule } from './report-section-routing.module';
import { ReportSectionComponent } from './report-section.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { LogReportTableModule } from 'src/app/components/log-report-table/log-report-table.module';
import { SpecialtyReportChartModule } from 'src/app/components/specialty-report-chart/specialty-report-chart.module';
import { DayReportChartModule } from 'src/app/components/day-report-chart/day-report-chart.module';
import { AskedAppointmentReportChartModule } from 'src/app/components/asked-appointment-report-chart/asked-appointment-report-chart.module';
import { FinishedAppointmentReportChartModule } from 'src/app/components/finished-appointment-report-chart/finished-appointment-report-chart.module';

@NgModule({
  declarations: [ReportSectionComponent],
  imports: [
    CommonModule,
    ReportSectionRoutingModule,
    DirectivesModule,
    LogReportTableModule,
    SpecialtyReportChartModule,
    DayReportChartModule,
    AskedAppointmentReportChartModule,
    FinishedAppointmentReportChartModule,
  ],
})
export class ReportSectionModule {}
