import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentSectionComponent } from './appointment-section.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentSectionRoutingModule {}
