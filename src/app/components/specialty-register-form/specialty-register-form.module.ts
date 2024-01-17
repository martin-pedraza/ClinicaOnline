import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpecialtyRegisterFormComponent } from './specialty-register-form.component';

@NgModule({
  declarations: [SpecialtyRegisterFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SpecialtyRegisterFormComponent],
})
export class SpecialtyRegisterFormModule {}
