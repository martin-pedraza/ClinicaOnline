import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  constructor(private firebaseService: FirebaseService) {}

  async saveAvailability(availability: any) {
    return this.firebaseService.saveItem(availability, 'availability');
  }

  getAvailabilityByDni(dni: string) {
    return this.firebaseService.getListWithAttribute(
      'availability',
      'specialist',
      dni
    );
  }

  deleteAvailability(id: string) {
    return this.firebaseService.deleteItem(id, 'availability');
  }
}
