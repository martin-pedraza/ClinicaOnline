import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { PatientService } from '../services/patient.service';

export function patientExistValidator(
  service: PatientService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const dni = control.value;
    const errorAnswer = { patientExist: '(Ya existe)' };

    return service.getPatientList().pipe(
      map((list) => {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];

          if (element['dni'] == dni) {
            control.setErrors(errorAnswer);
            return errorAnswer;
          }
        }
        return null;
      })
    );
  };
}
