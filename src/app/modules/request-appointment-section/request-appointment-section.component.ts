import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientService } from 'src/app/services/patient.service';
import { SpecialistService } from 'src/app/services/specialist.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { Location } from '@angular/common';
import { Specialist } from 'src/app/models/specialist.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-appointment-section',
  templateUrl: './request-appointment-section.component.html',
  styleUrls: ['./request-appointment-section.component.css'],
})
export class RequestAppointmentSectionComponent implements OnInit, OnDestroy {
  user: any;
  dni: string = '';
  name: string = '';

  specialtyList: any[] = [];
  specialtyListSubscription: Subscription | undefined;
  specialistList: any[] = [];
  specialistListSubscription: Subscription | undefined;
  appointmentList: any[] = [];
  appointmentListSubscription: Subscription | undefined;
  patientList: any[] = [];
  patientListSubscription: Subscription | undefined;

  filteredList: any[] = [];
  specialistSpecialtyList: any[] = [];
  specialistSpecialtyListSubscription: Subscription | undefined;
  specialtySelected: string = '';
  specialistSelected: string = '';
  dateSelected: string = '';
  dateList: any[] = [];
  timeList: any[] = [];
  isPatientSelected: boolean = false;
  spinner: boolean = false;

  constructor(
    private authService: AuthService,
    private specialtyService: SpecialtyService,
    private specialistService: SpecialistService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    if (this.user.profile != 'admin') {
      this.dni = this.user.dni;
      this.name = this.user.firstname + ' ' + this.user.lastname;
    }

    this.specialtyListSubscription = this.specialtyService
      .getSpecialtyList()
      .subscribe((list) => {
        this.specialtyList = list;
      });

    this.specialistListSubscription = this.specialistService
      .getSpecialistList()
      .subscribe((list) => {
        this.specialistList = list;
      });

    this.appointmentListSubscription = this.appointmentService
      .getPendingList()
      .subscribe((list) => {
        this.appointmentList =
          this.appointmentService.orderAppointmentList(list);
      });

    this.patientListSubscription = this.patientService
      .getPatientList()
      .subscribe((list) => {
        this.patientList = list;
      });
  }

  ngOnDestroy(): void {
    this.specialtyListSubscription?.unsubscribe();
    this.specialistListSubscription?.unsubscribe();
    this.appointmentListSubscription?.unsubscribe();
    this.patientListSubscription?.unsubscribe();
    this.specialistSpecialtyListSubscription?.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  changeSpecialist(specialist: string) {
    this.deleteFilters(true);
    this.specialistSelected = specialist;
    if (this.specialistSelected != '') {
      const array: any[] = [];
      const aux: any[] = [];
      for (let index = 0; index < this.appointmentList.length; index++) {
        const element = this.appointmentList[index];
        if (element['specialistDni'] == this.specialistSelected) {
          array.push(element);
          if (!aux.includes(element['specialty'])) {
            aux.push(element['specialty']);
          }
        }
      }
      this.filteredList = this.appointmentService.filterTwo(
        this.appointmentService.orderAppointmentList(array)
      );
      this.specialistSpecialtyListSubscription = this.specialtyService
        .getSpecialtyListThroughArray(aux)
        .subscribe((list) => {
          this.specialistSpecialtyList = list;
        });
    }
  }

  changeSpecialty(specialty: string) {
    this.deleteFilters(false);
    this.specialtySelected = specialty;
    if (this.specialtySelected != '') {
      const array: any[] = [];
      for (let index = 0; index < this.appointmentList.length; index++) {
        const element = this.appointmentList[index];
        if (
          element['specialty'] == this.specialtySelected &&
          element['specialistDni'] == this.specialistSelected
        ) {
          array.push(element);
          if (!this.dateList.includes(element['day'])) {
            this.dateList.push(element['day']);
          }
        }
      }
      this.filteredList = this.appointmentService.filterTwo(
        this.appointmentService.orderAppointmentList(array)
      );
    }
  }

  changeDate(date: string) {
    this.dateSelected = date;
    this.timeList = [];
    if (this.dateSelected != '') {
      const array: any[] = [];
      for (let index = 0; index < this.appointmentList.length; index++) {
        const element = this.appointmentList[index];
        if (
          element['specialistDni'] == this.specialistSelected &&
          element['specialty'] == this.specialtySelected &&
          element['day'] == this.dateSelected
        ) {
          array.push(element);
          if (!this.timeList.includes(element['time'])) {
            this.timeList.push(element['time']);
          }
        }
      }
      this.filteredList = this.appointmentService.filterTwo(
        this.appointmentService.orderAppointmentList(array)
      );
    }
  }

  changeTime(time: string) {
    if (time != '') {
      const array: any[] = [];
      for (let index = 0; index < this.appointmentList.length; index++) {
        const element = this.appointmentList[index];
        if (
          element['specialistDni'] == this.specialistSelected &&
          element['specialty'] == this.specialtySelected &&
          element['day'] == this.dateSelected &&
          element['time'] == time
        ) {
          array.push(element);
        }
      }
      this.filteredList = this.appointmentService.filterTwo(
        this.appointmentService.orderAppointmentList(array)
      );
    }
  }

  changePatient(event: any) {
    if (event.target.value != '') {
      this.isPatientSelected = true;
      this.dni = event.target.value.split('_')[0];
      this.name = event.target.value.split('_')[1];
    }
  }

  deleteFilters(specialist: boolean) {
    if (specialist) {
      this.specialistSpecialtyList = [];
    }
    this.dateList = [];
    this.timeList = [];
  }

  bookAppointment(id: string) {
    this.spinner = true;
    this.appointmentService
      .bookAppointment(id, {
        patientDni: this.dni,
        patientName: this.name,
        status: 'pending-approval',
      })
      .then(() => {
        Swal.fire({
          title: 'Turno reservado',
          icon: 'success',
          heightAuto: false,
        });
        this.filteredList = [];
        this.deleteFilters(true);
        this.spinner = false;
      });
  }

  // formatDate(dateString: string) {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // }

  // convertTo12HourFormat(time24: string) {
  //   const [hours, minutes] = time24.split(':');
  //   const hoursNumber = parseInt(hours, 10);
  //   const period = hoursNumber >= 12 ? 'pm' : 'am';
  //   const hours12 = hoursNumber % 12 === 0 ? 12 : hoursNumber % 12;
  //   return `${hours12.toString().padStart(2, '0')}:${minutes.padStart(
  //     2,
  //     '0'
  //   )} ${period}`;
  // }
}
