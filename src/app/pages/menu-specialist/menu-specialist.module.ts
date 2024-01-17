import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuSpecialistRoutingModule } from './menu-specialist-routing.module';
import { MenuSpecialistComponent } from './menu-specialist.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [MenuSpecialistComponent],
  imports: [CommonModule, MenuSpecialistRoutingModule, DirectivesModule],
})
export class MenuSpecialistModule {}
