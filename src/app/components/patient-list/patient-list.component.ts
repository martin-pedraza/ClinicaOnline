import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit, OnDestroy {
  specialist: any;
  patientList: any[] = [];
  patientListSubscription: Subscription | undefined;

  constructor(
    private historialService: HistorialService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.specialist = this.authService.loggedUser;
    
    this.patientListSubscription = this.historialService
      .getHistorialListBySpecialistDni(this.specialist.dni)
      .subscribe((list) => {
        this.patientList = [];
        const array: string[] = [];
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          if (!array.includes(element['patientDni'])) {
            array.push(element['patientDni']);
            this.patientList.push(element);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.patientListSubscription?.unsubscribe();
  }
}
