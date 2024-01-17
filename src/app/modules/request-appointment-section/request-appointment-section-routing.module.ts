import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestAppointmentSectionComponent } from './request-appointment-section.component';

const routes: Routes = [
  {
    path: '',
    component: RequestAppointmentSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestAppointmentSectionRoutingModule {}
