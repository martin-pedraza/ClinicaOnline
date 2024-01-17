import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { PatientService } from './patient.service';
import { SpecialistService } from './specialist.service';
import { forkJoin } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firebaseService: FirebaseService) {}

  getUserList() {
    return this.firebaseService.getList('user');
  }

  orderUserList(userList: any[]) {
    return userList.sort((a, b) => {
      const fistUser = a.lastname.toLowerCase();
      const secondUser = b.lastname.toLowerCase();

      if (fistUser < secondUser) {
        return -1;
      }
      if (fistUser > secondUser) {
        return 1;
      }
      return 0;
    });
  }
}
