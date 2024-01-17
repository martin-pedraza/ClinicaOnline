import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSectionRoutingModule } from './user-section-routing.module';
import { UserSectionComponent } from './user-section.component';
import { UserListModule } from 'src/app/components/user-list/user-list.module';
import { PatientRegisterFormModule } from 'src/app/components/patient-register-form/patient-register-form.module';
import { HealthcareRegisterFormModule } from 'src/app/components/healthcare-register-form/healthcare-register-form.module';
import { SpecialistRegisterFormModule } from 'src/app/components/specialist-register-form/specialist-register-form.module';
import { SpecialtyRegisterFormModule } from 'src/app/components/specialty-register-form/specialty-register-form.module';
import { AdminRegisterFormModule } from 'src/app/components/admin-register-form/admin-register-form.module';

@NgModule({
  declarations: [UserSectionComponent],
  imports: [
    CommonModule,
    UserSectionRoutingModule,
    UserListModule,
    PatientRegisterFormModule,
    HealthcareRegisterFormModule,
    SpecialistRegisterFormModule,
    SpecialtyRegisterFormModule,
    AdminRegisterFormModule,
  ],
})
export class UserSectionModule {}
