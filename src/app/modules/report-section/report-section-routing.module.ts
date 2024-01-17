import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportSectionComponent } from './report-section.component';

const routes: Routes = [
  {
    path: '',
    component: ReportSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportSectionRoutingModule {}
