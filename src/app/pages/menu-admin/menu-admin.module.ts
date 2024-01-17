import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuAdminRoutingModule } from './menu-admin-routing.module';
import { MenuAdminComponent } from './menu-admin.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [MenuAdminComponent],
  imports: [CommonModule, MenuAdminRoutingModule, DirectivesModule],
})
export class MenuAdminModule {}
