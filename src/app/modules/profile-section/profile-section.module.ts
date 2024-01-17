import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSectionRoutingModule } from './profile-section-routing.module';
import { ProfileSectionComponent } from './profile-section.component';
import { UserProfileModule } from 'src/app/components/user-profile/user-profile.module';
import { UserAvailabilityModule } from 'src/app/components/user-availability/user-availability.module';
import { AvailabilityFormModule } from 'src/app/components/availability-form/availability-form.module';


@NgModule({
  declarations: [
    ProfileSectionComponent
  ],
  imports: [
    CommonModule,
    ProfileSectionRoutingModule,
    UserProfileModule,
    UserAvailabilityModule,
    AvailabilityFormModule
  ]
})
export class ProfileSectionModule { }
