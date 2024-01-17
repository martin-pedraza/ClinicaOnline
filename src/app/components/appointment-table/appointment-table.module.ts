import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentTableComponent } from './appointment-table.component';

@NgModule({
  declarations: [AppointmentTableComponent],
  imports: [CommonModule],
  exports: [AppointmentTableComponent],
})
export class AppointmentTableModule {}
