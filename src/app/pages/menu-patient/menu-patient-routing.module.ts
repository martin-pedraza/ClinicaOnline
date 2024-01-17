import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPatientComponent } from './menu-patient.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPatientComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../../modules/profile-section/profile-section.module').then(
        (m) => m.ProfileSectionModule
      ),
  },
  {
    path: 'request-appointment',
    loadChildren: () =>
      import(
        '../../modules/request-appointment-section/request-appointment-section.module'
      ).then((m) => m.RequestAppointmentSectionModule),
  },
  {
    path: 'my-appointment',
    loadChildren: () =>
      import(
        '../../modules/my-appointment-section/my-appointment-section.module'
      ).then((m) => m.MyAppointmentSectionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPatientRoutingModule {}
