import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRegisterFormComponent } from './patient-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [PatientRegisterFormComponent],
  imports: [CommonModule, ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule ],
  exports: [PatientRegisterFormComponent],
})
export class PatientRegisterFormModule {}
