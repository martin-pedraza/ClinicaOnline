import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestAppointmentSectionRoutingModule } from './request-appointment-section-routing.module';
import { RequestAppointmentSectionComponent } from './request-appointment-section.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [RequestAppointmentSectionComponent],
  imports: [CommonModule, RequestAppointmentSectionRoutingModule, PipesModule],
})
export class RequestAppointmentSectionModule {}
