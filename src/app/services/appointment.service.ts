import { Injectable } from '@angular/core';
import { Availability } from '../models/availability.model';
import { Appointment } from '../models/appointment.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private firebaseService: FirebaseService) {}

  async generateAppointmentByAvailability(
    availability: Availability,
    specialistDni: string,
    specialistName: string,
    specialty: string,
    id: string
  ) {
    let startClock: Date = new Date(
      availability.startDate + 'T' + availability.startTime
    );
    let endTimeDay: Date = new Date(
      availability.startDate + 'T' + availability.endTime
    );

    let endDatetime: Date;
    if (availability.endDate != '') {
      endDatetime = new Date(availability.endDate + 'T' + availability.endTime);
    } else {
      let auxDate: Date = new Date(
        availability.startDate + 'T' + availability.endTime
      );
      auxDate.setDate(auxDate.getDate() + 15);
      endDatetime = auxDate;
    }

    const startHour: number = startClock.getHours();
    const startMinute: number = startClock.getMinutes();
    const duration: number = availability.appointmentDuration || 0;
    const interval: number = availability.interval || 0;
    const days: string[] = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo',
    ];

    while (startClock < endDatetime) {
      if (availability.day?.includes(days[startClock.getDay()])) {
        while (startClock < endTimeDay) {
          const turno: Appointment = {
            specialty: specialty,
            specialistDni: specialistDni,
            specialistName: specialistName,
            day: `${startClock.getFullYear()}-${
              startClock.getMonth() + 1
            }-${startClock.getDate()}`,
            time: `${startClock.getHours()}:${
              startClock.getMinutes() != 0 ? startClock.getMinutes() : '00'
            }`,
            status: 'new',
            comment: '',
            reason: '',
            patientDni: '',
            patientName: '',
            opinion: '',
            availability: id,
            survey: '',
            atention: '',
          };

          await this.firebaseService.saveItem(turno, 'appointment');

          startClock.setMinutes(startClock.getMinutes() + interval + duration);
        }
      }
      startClock.setDate(startClock.getDate() + 1);
      startClock.setHours(startHour);
      startClock.setMinutes(startMinute);
      endTimeDay.setDate(endTimeDay.getDate() + 1);
    }
  }

  deleteAppointmentByAvailability(id: string) {
    this.firebaseService
      .getListWithAttribute('appointment', 'availability', id)
      .subscribe((list) => {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          this.firebaseService.deleteItem(element['id'], 'appointment');
        }
      });
  }

  getAppointmentList() {
    return this.firebaseService.getList('appointment');
  }

  orderAppointmentList(appointment: any[]) {
    return appointment.sort((a, b) => {
      const dateOne = new Date(a.day);
      const dateTwo = new Date(b.day);
      const timeOne = a.time;
      const timeTwo = b.time;

      if (dateOne < dateTwo) {
        return -1;
      } else if (dateOne > dateTwo) {
        return 1;
      } else {
        const [hoursOne, minutesOne] = timeOne.split(':').map(Number);
        const [hoursTwo, minutesTwo] = timeTwo.split(':').map(Number);

        if (hoursOne < hoursTwo) {
          return -1;
        } else if (hoursOne > hoursTwo) {
          return 1;
        } else {
          if (minutesOne < minutesTwo) {
            return -1;
          } else if (minutesOne > minutesTwo) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    });
  }

  filterTwo(appointmentList: any[]) {
    if (appointmentList.length <= 2) {
      return appointmentList;
    } else {
      return appointmentList.slice(0, 2);
    }
  }

  filterByNumber(appointmentList: any[], number: number) {
    if (appointmentList.length <= number) {
      return appointmentList;
    } else {
      return appointmentList.slice(0, number);
    }
  }

  getPendingList() {
    const today = new Date().toISOString().split('T')[0];
    return this.firebaseService.getListWithAttributes(
      'appointment',
      'status',
      'new',
      'day',
      '>=',
      today
    );
  }

  getAppointmentListBySpecialty(specialty: string) {
    return this.firebaseService.getListWithAttribute(
      'appointment',
      'specialty',
      specialty
    );
  }

  getAppointmentListByDniPatient(dni: string) {
    return this.firebaseService.getListWithAttribute(
      'appointment',
      'patientDni',
      dni
    );
  }

  getAppointmentListByDniSpecialist(dni: string) {
    return this.firebaseService.getListWithAttributes(
      'appointment',
      'specialistDni',
      dni,
      'patientName',
      '!=',
      ''
    );
  }

  getAppointmentListByNames(specialistName: string, patientName: string) {
    return this.firebaseService.getListWithAttributes(
      'appointment',
      'specialistName',
      specialistName,
      'patientName',
      '==',
      patientName
    );
  }

  getAppointmentListByPatientAndSpecialty(
    patientName: string,
    specialty: string
  ) {
    return this.firebaseService.getListWithAttributes(
      'appointment',
      'patientName',
      patientName,
      'specialty',
      '==',
      specialty
    );
  }

  getAppointmentListBySpecialistAndSpecialty(
    specialistName: string,
    specialty: string
  ) {
    return this.firebaseService.getListWithAttributes(
      'appointment',
      'specialistName',
      specialistName,
      'specialty',
      '==',
      specialty
    );
  }

  getAppointmentListByNamePatient(name: string) {
    return this.firebaseService.getListWithAttribute(
      'appointment',
      'patientName',
      name
    );
  }

  getAppointmentListWithAnyPatient() {
    return this.firebaseService.getListCheckAttribute(
      'appointment',
      'patientName',
      '!=',
      ''
    );
  }

  bookAppointment(id: string, patient: any) {
    return this.firebaseService.updateItem(id, patient, 'appointment');
  }

  cancelAppointment(id: string, comment: string) {
    return this.firebaseService.updateItem(
      id,
      {
        reason: comment,
        status: 'cancelled',
      },
      'appointment'
    );
  }

  createAppointmentCauseCancel(appointment: any) {
    const turno: Appointment = {
      specialty: appointment.specialty,
      specialistDni: appointment.specialistDni,
      specialistName: appointment.specialistName,
      day: appointment.day,
      time: appointment.time,
      status: 'new',
      comment: '',
      reason: '',
      patientDni: '',
      patientName: '',
      opinion: '',
      availability: appointment.availability,
      survey: '',
      atention: '',
    };
    return this.firebaseService.saveItem(turno, 'appointment');
  }

  giveOpinion(id: string, opinion: string) {
    return this.firebaseService.updateItem(
      id,
      {
        opinion: opinion,
      },
      'appointment'
    );
  }

  acceptAppointment(id: string) {
    return this.firebaseService.updateItem(
      id,
      { status: 'accepted' },
      'appointment'
    );
  }

  rejectAppointment(id: string, comment: string) {
    return this.firebaseService.updateItem(
      id,
      { status: 'rejected', reason: comment },
      'appointment'
    );
  }

  doneAppointment(id: string, comment: string) {
    return this.firebaseService.updateItem(
      id,
      { status: 'done', comment: comment },
      'appointment'
    );
  }

  saveSurvey(id: string, comment: any) {
    return this.firebaseService.updateItem(
      id,
      { survey: comment },
      'appointment'
    );
  }

  recordAtention(id: string, atention: any) {
    return this.firebaseService.updateItem(
      id,
      { atention: atention },
      'appointment'
    );
  }
}
