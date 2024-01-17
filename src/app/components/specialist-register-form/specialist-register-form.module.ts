import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialistRegisterFormComponent } from './specialist-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [SpecialistRegisterFormComponent],
  imports: [CommonModule, ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule],
  exports: [SpecialistRegisterFormComponent],
})
export class SpecialistRegisterFormModule {}
