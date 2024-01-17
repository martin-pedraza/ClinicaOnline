import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { PatientRegisterFormModule } from 'src/app/components/patient-register-form/patient-register-form.module';
import { HealthcareRegisterFormModule } from 'src/app/components/healthcare-register-form/healthcare-register-form.module';
import { SpecialtyRegisterFormModule } from 'src/app/components/specialty-register-form/specialty-register-form.module';
import { SpecialistRegisterFormModule } from 'src/app/components/specialist-register-form/specialist-register-form.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    PatientRegisterFormModule,
    HealthcareRegisterFormModule,
    SpecialtyRegisterFormModule,
    SpecialistRegisterFormModule,
    DirectivesModule
  ],
})
export class RegisterModule {}
