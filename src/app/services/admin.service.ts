import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private firebaseService: FirebaseService) {}

  getAdminList() {
    return this.firebaseService.getListWithAttribute(
      'user',
      'profile',
      'admin'
    );
  }

  saveAdmin(admin: any) {
    return this.firebaseService.saveItem(admin, 'user');
  }
}
