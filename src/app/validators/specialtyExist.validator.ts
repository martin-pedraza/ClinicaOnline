import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { SpecialtyService } from '../services/specialty.service';

export function specialtyExistValidator(
  service: SpecialtyService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const specialty = control.value;
    const errorAnswer = { specialtyExist: '(Ya existe)' };

    return service.getSpecialtyList().pipe(
      map((hcs) => {
        for (let index = 0; index < hcs.length; index++) {
          const element = hcs[index];

          if (element['name'] == specialty) {
            control.setErrors(errorAnswer);
            return errorAnswer;
          }
        }
        return null;
      })
    );
  };
}
