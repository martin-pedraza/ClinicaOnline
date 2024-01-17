import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { ClinicHistoryModalModule } from '../clinic-history-modal/clinic-history-modal.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, ClinicHistoryModalModule],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}
