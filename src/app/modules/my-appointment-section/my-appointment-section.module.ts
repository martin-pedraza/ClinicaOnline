import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAppointmentSectionRoutingModule } from './my-appointment-section-routing.module';
import { MyAppointmentSectionComponent } from './my-appointment-section.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyAppointmentSectionComponent
  ],
  imports: [
    CommonModule,
    MyAppointmentSectionRoutingModule,
    FormsModule
  ]
})
export class MyAppointmentSectionModule { }
