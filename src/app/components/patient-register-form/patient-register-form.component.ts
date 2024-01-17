import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { HealthcareService } from 'src/app/services/healthcare.service';
import { ImageService } from 'src/app/services/image.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';
import { emailExistValidator } from 'src/app/validators/emailExist.validator';
import { healthcareValidator } from 'src/app/validators/healthcare.validator';
import { patientExistValidator } from 'src/app/validators/patientExist.validator';
import { repeatPasswordValidator } from 'src/app/validators/repeatPassword.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-register-form',
  templateUrl: './patient-register-form.component.html',
  styleUrls: ['./patient-register-form.component.css'],
})
export class PatientRegisterFormComponent implements OnInit, OnDestroy {
  @Output() formEvent = new EventEmitter<string>();
  form!: FormGroup;
  healthcareList: any[] = [];
  healthcareSubscription: Subscription | undefined;
  selectedFileOne: File | null = null;
  selectedFileTwo: File | null = null;
  captchaResolved = false;
  spinner: boolean = false;

  constructor(
    private healthcareService: HealthcareService,
    private patientService: PatientService,
    private userService: UserService,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.assigForm();

    this.healthcareSubscription = this.healthcareService
      .getHealthcareList()
      .subscribe((list) => {
        this.healthcareList = list;
      });
  }

  ngOnDestroy(): void {
    this.healthcareSubscription?.unsubscribe();
  }

  assigForm() {
    this.form = new FormGroup(
      {
        firstname: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ]),
        lastname: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ]),
        age: new FormControl('', [
          Validators.required,
          Validators.min(0),
          Validators.max(125),
        ]),
        dni: new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(6),
            Validators.maxLength(10),
          ],
          [patientExistValidator(this.patientService)]
        ),
        healthcare: new FormControl('', []),
        email: new FormControl(
          '',
          [Validators.required, Validators.email],
          [emailExistValidator(this.userService)]
        ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        repeatPassword: new FormControl('', [Validators.required]),
        images: new FormControl('', [Validators.required]),
      },
      [healthcareValidator(), repeatPasswordValidator()]
    );
  }

  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get age() {
    return this.form.get('age');
  }
  get dni() {
    return this.form.get('dni');
  }
  get healthcare() {
    return this.form.get('healthcare');
  }
  get password() {
    return this.form.get('password');
  }
  get repeatPassword() {
    return this.form.get('repeatPassword');
  }
  get email() {
    return this.form.get('email');
  }
  get images() {
    return this.form.get('images');
  }

  handleCaptchaResolved(){
    this.captchaResolved = true;
  }

  changeForm(form: string) {
    this.formEvent.emit(form);
  }

  addHealthcare(event: any) {
    if (event.target.value == 'Otra') {
      this.changeForm('healthcare');
    }
  }

  onFileSelected(event: any) {
    const fileOne: File = event.target.files[0];
    const fileTwo: File = event.target.files[1];
    if (fileOne) {
      this.selectedFileOne = fileOne;
    }
    if (fileTwo) {
      this.selectedFileTwo = fileTwo;
    }
  }

  sentForm() {
    this.spinner = true;
    let newPatient: Patient;
    this.constructObjet().then((p) => {
      newPatient = p;
      this.patientService.savePatient(newPatient).then(() => {
        Swal.fire({
          title: 'Paciente creado',
          icon: 'success',
          heightAuto: false,
        });
        this.form.reset();
        this.spinner = false;
      });
    });
  }

  async constructObjet() {
    const f = this.form.value;

    let imageOne = this.selectedFileOne
      ? await this.saveImage(f, this.selectedFileOne, 1)
      : '';

    let imageTwo = this.selectedFileTwo
      ? await this.saveImage(f, this.selectedFileTwo, 2)
      : '';

    return {
      firstname: f.firstname,
      lastname: f.lastname,
      age: f.age,
      dni: f.dni,
      healthcare: f.healthcare,
      email: f.email,
      password: f.password,
      firstImage: imageOne,
      secondImage: imageTwo,
      profile: 'patient',
    };
  }

  saveImage(form: any, image: File, number: number) {
    return this.imageService.uploadImage(
      image,
      `patient_images/P-${form.lastname}-${form.firstname}-patient-${number}`
    );
  }
}
