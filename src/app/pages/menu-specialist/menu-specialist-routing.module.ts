import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSpecialistComponent } from './menu-specialist.component';

const routes: Routes = [
  {
    path: '',
    component: MenuSpecialistComponent,
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
    path: 'my-appointment',
    loadChildren: () =>
      import(
        '../../modules/my-appointment-section/my-appointment-section.module'
      ).then((m) => m.MyAppointmentSectionModule),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('../../modules/patient-section/patient-section.module').then(
        (m) => m.PatientSectionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSpecialistRoutingModule {}
