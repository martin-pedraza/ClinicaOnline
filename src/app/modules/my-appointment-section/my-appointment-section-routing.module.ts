import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAppointmentSectionComponent } from './my-appointment-section.component';

const routes: Routes = [
  {
    path: '',
    component: MyAppointmentSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAppointmentSectionRoutingModule {}
