import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patient-section',
  templateUrl: './patient-section.component.html',
  styleUrls: ['./patient-section.component.css'],
})
export class PatientSectionComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
