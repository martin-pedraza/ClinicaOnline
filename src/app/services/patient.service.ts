import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private firebaseService: FirebaseService) {}

  getPatientList() {
    return this.firebaseService.getListWithAttribute(
      'user',
      'profile',
      'patient'
    );
  }

  savePatient(patient: any) {
    return this.firebaseService.saveItem(patient, 'user');
  }
}
