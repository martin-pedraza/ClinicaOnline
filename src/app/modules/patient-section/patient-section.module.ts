import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientSectionRoutingModule } from './patient-section-routing.module';
import { PatientSectionComponent } from './patient-section.component';
import { PatientListModule } from 'src/app/components/patient-list/patient-list.module';

@NgModule({
  declarations: [PatientSectionComponent],
  imports: [CommonModule, PatientSectionRoutingModule, PatientListModule],
})
export class PatientSectionModule {}
