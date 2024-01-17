import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientSectionComponent } from './patient-section.component';

const routes: Routes = [
  {
    path: '',
    component: PatientSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientSectionRoutingModule {}
