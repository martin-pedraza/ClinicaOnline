import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginFormModule } from 'src/app/components/login-form/login-form.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginFormModule,
    DirectivesModule,
  ],
})
export class LoginModule {}
