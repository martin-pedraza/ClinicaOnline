import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Healthcare } from 'src/app/models/healthcare.model';
import { HealthcareService } from 'src/app/services/healthcare.service';
import { healthcareExistValidator } from 'src/app/validators/healthcareExist.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-healthcare-register-form',
  templateUrl: './healthcare-register-form.component.html',
  styleUrls: ['./healthcare-register-form.component.css'],
})
export class HealthcareRegisterFormComponent implements OnInit {
  @Output() formEvent = new EventEmitter<string>();
  form!: FormGroup;
  spinner: boolean = false;

  constructor(private healthcareService: HealthcareService) {}

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
        [healthcareExistValidator(this.healthcareService)]
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
    const newHealthcare: Healthcare = this.constructObjet();

    this.healthcareService.saveHealthcare(newHealthcare).then(() => {
      Swal.fire({
        title: 'Obra social agregada',
        icon: 'success',
        heightAuto: false,
      });
      this.form.reset();
      this.spinner = false;
      this.changeForm('patient');
    });
  }

  constructObjet() {
    return { name: this.form.value.name };
  }
}
