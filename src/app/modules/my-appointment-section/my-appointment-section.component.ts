import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { HistorialService } from 'src/app/services/historial.service';
import { SpecialistService } from 'src/app/services/specialist.service';

@Component({
  selector: 'app-my-appointment-section',
  templateUrl: './my-appointment-section.component.html',
  styleUrls: ['./my-appointment-section.component.css'],
})
export class MyAppointmentSectionComponent implements OnInit, OnDestroy {
  user: any;
  isPatient: boolean = false;
  savedPatient: any;
  savedSpecialty: string = '';

  appointmentList: any[] = [];
  appointmentListSubscription: Subscription | undefined;
  optionList: any[] = [];
  filteredList: any[] = [];
  filteredListSubscription: Subscription | undefined;
  keyword: string = '';

  spinner: boolean = false;
  formShown: string = '';
  textAreaValue: string = '';
  appointmentId: string = '';
  appointmentSelected: any;

  cm: string = '';
  kg: string = '';
  c: string = '';
  lowmmHg: string = '';
  highmmHg: string = '';
  key1: string = '';
  key2: string = '';
  key3: string = '';
  value1: string = '';
  value2: string = '';
  value3: string = '';

  surveyAnswer: any = {
    p1: '10',
    p2: '10',
    p3: '10',
  };

  constructor(
    private location: Location,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private historialService: HistorialService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    this.isPatient = this.user.profile == 'patient';

    // if (this.user.profile == 'patient') {
    //   this.isPatient = true;
    //   this.appointmentListSubscription = this.appointmentService
    //     .getAppointmentListByDniPatient(this.user.dni)
    //     .subscribe((list) => {
    //       this.appointmentList =
    //         this.appointmentService.orderAppointmentList(list);
    //       this.createOptionList();
    //     });
    // } else {
    //   this.appointmentListSubscription = this.appointmentService
    //     .getAppointmentListByDniSpecialist(this.user.dni)
    //     .subscribe((list) => {
    //       this.appointmentList =
    //         this.appointmentService.orderAppointmentList(list);
    //       this.createOptionList();
    //     });
    // }
  }

  ngOnDestroy(): void {
    this.appointmentListSubscription?.unsubscribe();
    this.filteredListSubscription?.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  // createOptionList() {
  //   this.optionList = [];
  //   for (let index = 0; index < this.appointmentList.length; index++) {
  //     const element = this.appointmentList[index];
  //     if (this.isPatient) {
  //       if (!this.optionList.includes(element['specialistName'])) {
  //         this.optionList.push(element['specialistName']);
  //       }
  //     } else {
  //       if (!this.optionList.includes(element['patientName'])) {
  //         this.optionList.push(element['patientName']);
  //       }
  //     }
  //     if (!this.optionList.includes(element['specialty'])) {
  //       this.optionList.push(element['specialty']);
  //     }
  //   }
  // }

  // changeFilter(event: any) {
  //   if (event.target.value != '') {
  //     if (this.isPatient && event.target.value.split(' ').length == 1) {
  //       this.filteredListSubscription = this.appointmentService
  //         .getAppointmentListByPatientAndSpecialty(
  //           this.user.firstname + ' ' + this.user.lastname,
  //           event.target.value
  //         )
  //         .subscribe((list) => {
  //           this.filteredList =
  //             this.appointmentService.orderAppointmentList(list);
  //         });
  //       return;
  //     }

  //     if (event.target.value.split(' ').length > 1) {
  //       const specialistName = !this.isPatient
  //         ? this.user.firstname + ' ' + this.user.lastname
  //         : event.target.value;
  //       const patientName = this.isPatient
  //         ? this.user.firstname + ' ' + this.user.lastname
  //         : event.target.value;
  //       this.filteredListSubscription = this.appointmentService
  //         .getAppointmentListByNames(specialistName, patientName)
  //         .subscribe((list) => {
  //           this.filteredList =
  //             this.appointmentService.orderAppointmentList(list);
  //         });
  //       return;
  //     }

  //     if (event.target.value.split(' ').length == 1) {
  //       this.filteredListSubscription = this.appointmentService
  //         .getAppointmentListBySpecialistAndSpecialty(
  //           event.target.value,
  //           this.user.firstname + ' ' + this.user.lastname
  //         )
  //         .subscribe((list) => {
  //           this.filteredList =
  //             this.appointmentService.orderAppointmentList(list);
  //         });
  //       return;
  //     }
  //   }
  // }

  changeForm(form: string, appointment: any, comment: string) {
    this.textAreaValue = '';
    if (comment) {
      this.textAreaValue = comment;
    }
    this.formShown = form;
    this.appointmentSelected = appointment;
    this.appointmentId = appointment.id;
    this.savePatient(appointment.patientDni, appointment.patientName);
  }

  changeAnswer(event: any, question: number) {
    const option = event.target.value;
    if (option != '') {
      switch (question) {
        case 1:
          this.surveyAnswer['p1'] = option;
          break;
        case 2:
          this.surveyAnswer['p2'] = option;
          break;
        case 3:
          this.surveyAnswer['p3'] = option;
          break;
      }
    }
  }

  sentAnswer() {
    switch (this.formShown) {
      case 'cancel':
        this.cancelAppointment();
        break;
      case 'opinion':
        this.giveOpinion();
        break;
      case 'rejected':
        this.rejectAppointment();
        break;
      case 'done':
        this.saveHistorial();
        this.doneAppointment();
        break;
      case 'survey':
        this.saveSurvey();
        break;
    }
    this.formShown = '';
  }

  cancelAppointment() {
    this.spinner = true;
    this.appointmentService
      .createAppointmentCauseCancel(this.appointmentSelected)
      .then(() => {
        this.appointmentService.cancelAppointment(
          this.appointmentId,
          this.textAreaValue
        );
      })
      .then(() => {
        Swal.fire({
          title: 'Turno cancelado',
          icon: 'info',
          heightAuto: false,
        });
        this.spinner = false;
      });
  }

  giveOpinion() {
    this.spinner = true;
    this.appointmentService
      .giveOpinion(this.appointmentId, this.textAreaValue)
      .then(() => {
        Swal.fire({
          title: 'Opinión guardada',
          icon: 'success',
          heightAuto: false,
        });
        this.spinner = false;
      });
  }

  acceptAppointment(id: string) {
    this.spinner = true;
    this.appointmentService.acceptAppointment(id).then(() => {
      Swal.fire({
        title: 'Turno aceptado',
        icon: 'success',
        heightAuto: false,
      });
      this.spinner = false;
    });
  }

  rejectAppointment() {
    this.spinner = true;
    this.appointmentService
      .rejectAppointment(this.appointmentSelected, this.textAreaValue)
      .then(() => {
        Swal.fire({
          title: 'Turno rechazado',
          icon: 'info',
          heightAuto: false,
        });
        this.spinner = false;
      });
  }

  doneAppointment() {
    this.spinner = true;
    this.appointmentService
      .doneAppointment(this.appointmentId, this.textAreaValue)
      .then(() => {
        Swal.fire({
          title: 'Turno finalizado',
          icon: 'success',
          heightAuto: false,
        });
        this.spinner = false;
      });
  }

  saveSurvey() {
    this.spinner = true;
    this.appointmentService
      .saveSurvey(this.appointmentId, this.surveyAnswer)
      .then(() => {
        Swal.fire({
          title: 'Encuesta guardada',
          icon: 'success',
          heightAuto: false,
        });
        this.spinner = false;
      });
  }

  savePatient(patientDni: string, patientName: string) {
    this.savedPatient = { patientDni: patientDni, patientName: patientName };
  }

  saveHistorial() {
    const newHistorial = this.makeHistorial();
    this.appointmentService.recordAtention(this.appointmentId, newHistorial);
    this.historialService.saveHistorial(newHistorial);
  }

  makeHistorial() {
    return {
      cm: this.cm,
      kg: this.kg,
      c: this.c,
      lowmmHg: this.lowmmHg,
      highmmHg: this.highmmHg,
      key1: this.key1,
      key2: this.key2,
      key3: this.key3,
      value1: this.value1,
      value2: this.value2,
      value3: this.value3,
      patientDni: this.savedPatient.patientDni,
      patientName: this.savedPatient.patientName,
      specialistDni: this.user.dni,
      specialistName: this.user.firstname + ' ' + this.user.lastname,
      date: new Date().toISOString().split('T')[0],
      specialty: this.savedSpecialty,
    };
  }

  loadAppointment() {
    if (this.isPatient) {
      this.filteredListSubscription = this.appointmentService
        .getAppointmentListByDniPatient(this.user.dni)
        .subscribe((appointments) => {
          this.filteredList = appointments.filter((appointment) =>
            this.concatenatedFields(appointment)
              .toLowerCase()
              .includes(this.keyword.toLowerCase())
          );
        });
    } else {
      this.filteredListSubscription = this.appointmentService
        .getAppointmentList()
        .subscribe((appointments) => {
          this.filteredList = appointments.filter((appointment) =>
            this.concatenatedFields(appointment)
              .toLowerCase()
              .includes(this.keyword.toLowerCase())
          );
        });
    }
  }

  concatenatedFields(appointment: any): string {
    // Función auxiliar para asignar un valor predeterminado si es undefined o null
    const defaultValue = (value: any, defaultVal: any = '') =>
      value !== undefined && value !== null ? value : defaultVal;

    // Aplicar la lógica para todos los campos
    const specialty = defaultValue(appointment.specialty);
    const specialistDni = defaultValue(appointment.specialistDni);
    const specialistName = defaultValue(appointment.specialistName);
    const day = defaultValue(appointment.day);
    const time = defaultValue(appointment.time);
    const status = defaultValue(appointment.status);
    const comment = defaultValue(appointment.comment);
    const reason = defaultValue(appointment.reason);
    const patientDni = defaultValue(appointment.patientDni);
    const patientName = defaultValue(appointment.patientName);
    const opinion = defaultValue(appointment.opinion);
    const availability = defaultValue(appointment.availability);
    // const survey = defaultValue(appointment.survey);
    const cm = defaultValue(appointment.atention?.cm);
    const kg = defaultValue(appointment.atention?.kg);
    const lowmmHg = defaultValue(appointment.atention?.lowmmHg);
    const highmmHg = defaultValue(appointment.atention?.highmmHg);
    const c = defaultValue(appointment.atention?.c);
    const key1 = defaultValue(appointment.atention?.key1);
    const value1 = defaultValue(appointment.atention?.value1);
    const key2 = defaultValue(appointment.atention?.key2);
    const value2 = defaultValue(appointment.atention?.value2);
    const key3 = defaultValue(appointment.atention?.key3);
    const value3 = defaultValue(appointment.atention?.value3);
    //console.log(`DATOS TURNOS",${nombreDoctor} ${apellidoDoctor} ${nombrePaciente} ${apellidoPaciente} ${altura} ${peso} ${presion} ${temperatura} ${confirmacionDoctor} ${especialidad} ${fecha} ${hora} ${nombrePaciente} ${obraSocialPaciente} ${key1} ${value1} ${key2} ${value2} ${key3} ${value3}`);
    return `${specialistDni} ${specialistName} ${patientName} ${patientDni} ${status} ${comment} ${reason} ${cm} ${kg} ${lowmmHg} ${highmmHg} ${c} ${availability} ${specialty} ${day} ${time} ${patientName} ${opinion} ${key1} ${value1} ${key2} ${value2} ${key3} ${value3}`;
  }

  seeAtention(appointment: any) {
    const table = `
      <table class="table">
        <thead>
          <tr>
            <th>CLAVE</th>
            <th>VALOR</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>Altura</td>
              <td>${appointment.atention.cm}</td>
            </tr>
            <tr>
              <td>Peso</td>
              <td>${appointment.atention.kg}</td>
            </tr>
            <tr>
              <td>Temperatura</td>
              <td>${appointment.atention.c}</td>
            </tr>
            <tr>
              <td>Presion alta</td>
              <td>${appointment.atention.highmmHg}</td>
            </tr>
            <tr>
              <td>Presion baja</td>
              <td>${appointment.atention.lowmmHg}</td>
            </tr>
            <tr>
              <td>${appointment.atention.key1}</td>
              <td>${appointment.atention.value1}</td>
            </tr>
            <tr>
              <td>${appointment.atention.key2}</td>
              <td>${appointment.atention.value2}</td>
            </tr>
            <tr>
              <td>${appointment.atention.key3}</td>
              <td>${appointment.atention.value3}</td>
            </tr>
        </tbody>
      </table>
    `;
    Swal.fire({
      title: 'Detalles de la atención',
      icon: 'info',
      html: table,
      heightAuto: false,
    });
  }
}
