import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { ClinicHistoryModalModule } from '../clinic-history-modal/clinic-history-modal.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, ClinicHistoryModalModule],
  exports: [UserListComponent],
})
export class UserListModule {}
