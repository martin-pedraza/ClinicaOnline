import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HealthcareRegisterFormComponent } from './healthcare-register-form.component';

@NgModule({
  declarations: [HealthcareRegisterFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [HealthcareRegisterFormComponent],
})
export class HealthcareRegisterFormModule {}
