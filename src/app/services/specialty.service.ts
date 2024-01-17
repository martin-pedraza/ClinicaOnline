import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  constructor(private firebaseService: FirebaseService) {}

  getSpecialtyList() {
    return this.firebaseService.getList('specialty');
  }

  saveSpecialty(specialty: any) {
    return this.firebaseService.saveItem(specialty, 'specialty');
  }

  getSpecialtyListThroughArray(array :any[]){
    return this.firebaseService.getListCheckAttribute('specialty', 'name', 'in', array);
  }
}
