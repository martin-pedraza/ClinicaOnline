import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  constructor(private firebaseService: FirebaseService) {}

  getHistorialList() {
    return this.firebaseService.getList('historial');
  }

  saveHistorial(historial: any) {
    return this.firebaseService.saveItem(historial, 'historial');
  }

  orderHistorialList(historialList: any[]) {
    return historialList.sort((a, b) => {
      const fistHistorial = new Date(a.date);
      const secondHistorial = new Date(b.date);

      if (fistHistorial < secondHistorial) {
        return -1;
      }
      if (fistHistorial > secondHistorial) {
        return 1;
      }
      return 0;
    });
  }

  getHistorialListBySpecialistDni(specialistDni: string) {
    return this.firebaseService.getListWithAttribute(
      'historial',
      'specialistDni',
      specialistDni
    );
  }

  getHistorialListByPatientDni(patientDni: string) {
    return this.firebaseService.getListWithAttribute(
      'historial',
      'patientDni',
      patientDni
    );
  }
}
