import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Specialist } from 'src/app/models/specialist.model';
import { ImageService } from 'src/app/services/image.service';
import { SpecialistService } from 'src/app/services/specialist.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { UserService } from 'src/app/services/user.service';
import { emailExistValidator } from 'src/app/validators/emailExist.validator';
import { repeatPasswordValidator } from 'src/app/validators/repeatPassword.validator';
import { specialistExistValidator } from 'src/app/validators/specialistExist.validator';
import { specialtyValidator } from 'src/app/validators/specialty.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialist-register-form',
  templateUrl: './specialist-register-form.component.html',
  styleUrls: ['./specialist-register-form.component.css'],
})
export class SpecialistRegisterFormComponent {
  @Output() formEvent = new EventEmitter<string>();
  form!: FormGroup;
  specialtyList: any[] = [];
  specialtySubscription: Subscription | undefined;
  spinner: boolean = false;
  selectedFile: File | null = null;
  specialties: any[] = [];
  captchaResolved = false;

  constructor(
    private specialtyService: SpecialtyService,
    private specialistService: SpecialistService,
    private userService: UserService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.assigForm();

    this.specialtySubscription = this.specialtyService
      .getSpecialtyList()
      .subscribe((list) => {
        this.specialtyList = list;
      });
  }

  ngOnDestroy(): void {
    this.specialtySubscription?.unsubscribe();
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
          [specialistExistValidator(this.specialistService)]
        ),
        specialty: new FormControl('', []),
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
        image: new FormControl('', Validators.required),
      },
      [specialtyValidator(), repeatPasswordValidator()]
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
  get specialty() {
    return this.form.get('specialty');
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
  get image() {
    return this.form.get('image');
  }

  handleCaptchaResolved() {
    this.captchaResolved = true;
  }

  changeForm(form: string) {
    this.formEvent.emit(form);
  }

  addSpecialty(specialty: string) {
    if (specialty == 'Otra') {
      this.changeForm('specialty');
      return;
    }
    if (this.specialties.includes(specialty)) {
      this.specialties.splice(this.specialties.indexOf(specialty), 1);
    } else {
      this.specialties.push(specialty);
    }
  }

  onFileSelected(event: any) {
    const fileOne: File = event.target.files[0];
    if (fileOne) {
      this.selectedFile = fileOne;
    }
  }

  sentForm() {
    this.spinner = true;
    let newSpecialist: Specialist;
    this.constructObjet().then((sp) => {
      newSpecialist = sp;
      this.specialistService.saveSpecialist(newSpecialist).then(() => {
        Swal.fire({
          title: 'Especialista creado',
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

    let image = this.selectedFile
      ? await this.saveImage(f, this.selectedFile)
      : '';

    return {
      firstname: f.firstname,
      lastname: f.lastname,
      age: f.age,
      dni: f.dni,
      specialty: this.specialties,
      email: f.email,
      password: f.password,
      image: image,
      profile: 'specialist',
      status: 'pending',
    };
  }

  saveImage(form: any, image: File) {
    return this.imageService.uploadImage(
      image,
      `specialist_images/SP-${form.lastname}-${form.firstname}-specialist`
    );
  }
}
