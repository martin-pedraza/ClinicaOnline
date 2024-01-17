import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialistService {
  constructor(private firebaseService: FirebaseService) {}

  getSpecialistList() {
    return this.firebaseService.getListWithAttribute(
      'user',
      'profile',
      'specialist'
    );
  }

  getSpecialistWithSpecialty(specialty: string) {
    return this.firebaseService.getListWithAttributes(
      'user',
      'profile',
      'specialist',
      'specialty',
      'array-contains',
      specialty
    );
  }

  saveSpecialist(specialist: any) {
    return this.firebaseService.saveItem(specialist, 'user');
  }

  changeSpecialistStatus(option: boolean, id: string) {
    const status = option ? 'enabled' : 'disabled';
    return this.firebaseService.updateItem(id, { status: status }, 'user');
  }
}
