import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdminComponent } from './menu-admin.component';

const routes: Routes = [
  {
    path: '',
    component: MenuAdminComponent,
  },
  {
    path: 'user-section',
    loadChildren: () =>
      import('../../modules/user-section/user-section.module').then(
        (m) => m.UserSectionModule
      ),
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
    path: 'appointment',
    loadChildren: () =>
      import(
        '../../modules/appointment-section/appointment-section.module'
      ).then((m) => m.AppointmentSectionModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('../../modules/report-section/report-section.module').then(
        (m) => m.ReportSectionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAdminRoutingModule {}
