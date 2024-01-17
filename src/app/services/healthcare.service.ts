import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class HealthcareService {

  constructor(private firebaseService :FirebaseService) { }

  getHealthcareList(){
    return this.firebaseService.getList("healthcare");
  }

  saveHealthcare(healthcare :any){
    return this.firebaseService.saveItem(healthcare, 'healthcare');
  }
}
