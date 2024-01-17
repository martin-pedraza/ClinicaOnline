import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Specialty } from 'src/app/models/specialty.model';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { specialtyExistValidator } from 'src/app/validators/specialtyExist.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialty-register-form',
  templateUrl: './specialty-register-form.component.html',
  styleUrls: ['./specialty-register-form.component.css'],
})
export class SpecialtyRegisterFormComponent {
  @Output() formEvent = new EventEmitter<string>();
  form!: FormGroup;
  spinner: boolean = false;

  constructor(private specialtyService: SpecialtyService) {}

  ngOnInit(): void {
    this.assigForm();
  }

  assigForm() {
    this.form = new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.minLength(3),
        ],
        [specialtyExistValidator(this.specialtyService)]
      ),
    });
  }

  get name() {
    return this.form.get('name');
  }

  changeForm(form: string) {
    this.formEvent.emit(form);
  }

  sentForm() {
    this.spinner = true;
    const newSpecialty: Specialty = this.constructObjet();

    this.specialtyService.saveSpecialty(newSpecialty).then(() => {
      Swal.fire({
        title: 'Especialidad agregada',
        icon: 'success',
        heightAuto: false,
      });
      this.form.reset();
      this.spinner = false;
      this.changeForm('specialist');
    });
  }

  constructObjet() {
    return {
      name: this.form.value.name,
      image: './../../../assets/specialty/general.png',
    };
  }
}
