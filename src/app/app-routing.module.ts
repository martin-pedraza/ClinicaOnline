import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { adminGuard } from './guards/admin.guard';
import { profileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'menu-patient',
    loadChildren: () =>
      import('./pages/menu-patient/menu-patient.module').then(
        (m) => m.MenuPatientModule
      ),
    canActivate: [profileGuard],
    data: { profile: 'patient' },
  },
  {
    path: 'menu-specialist',
    loadChildren: () =>
      import('./pages/menu-specialist/menu-specialist.module').then(
        (m) => m.MenuSpecialistModule
      ),
    canActivate: [profileGuard],
    data: { profile: 'specialist' },
  },
  {
    path: 'menu-admin',
    loadChildren: () =>
      import('./pages/menu-admin/menu-admin.module').then(
        (m) => m.MenuAdminModule
      ),
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
