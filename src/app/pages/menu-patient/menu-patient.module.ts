import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPatientRoutingModule } from './menu-patient-routing.module';
import { MenuPatientComponent } from './menu-patient.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [MenuPatientComponent],
  imports: [CommonModule, MenuPatientRoutingModule, DirectivesModule],
})
export class MenuPatientModule {}
