import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRegisterFormComponent } from './admin-register-form.component';

@NgModule({
  declarations: [AdminRegisterFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AdminRegisterFormComponent],
})
export class AdminRegisterFormModule {}
