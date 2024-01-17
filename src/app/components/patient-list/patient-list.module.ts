import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list.component';
import { ClinicHistoryModalModule } from '../clinic-history-modal/clinic-history-modal.module';
import { AppointmentTableModule } from '../appointment-table/appointment-table.module';

@NgModule({
  declarations: [PatientListComponent],
  imports: [CommonModule, ClinicHistoryModalModule, AppointmentTableModule],
  exports: [PatientListComponent],
})
export class PatientListModule {}
