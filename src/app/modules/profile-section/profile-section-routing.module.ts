import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSectionComponent } from './profile-section.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSectionRoutingModule {}
