import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  selectedFormPatient: string = '';
  selectedFormSpecialist: string = '';

  changeFormPatient(form: string) {
    this.selectedFormSpecialist = '';
    this.selectedFormPatient = form;
  }

  changeFormSpecialist(form: string) {
    this.selectedFormPatient = '';
    this.selectedFormSpecialist = form;
  }
}
