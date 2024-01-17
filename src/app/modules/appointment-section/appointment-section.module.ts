import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentSectionRoutingModule } from './appointment-section-routing.module';
import { AppointmentSectionComponent } from './appointment-section.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppointmentSectionComponent],
  imports: [CommonModule, AppointmentSectionRoutingModule, FormsModule],
  exports: [AppointmentSectionComponent],
})
export class AppointmentSectionModule {}
