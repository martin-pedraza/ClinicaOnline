import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityFormComponent } from './availability-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AvailabilityFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AvailabilityFormComponent],
})
export class AvailabilityFormModule {}
