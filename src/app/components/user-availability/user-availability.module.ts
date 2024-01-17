import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvailabilityComponent } from './user-availability.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserAvailabilityComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UserAvailabilityComponent],
})
export class UserAvailabilityModule {}
