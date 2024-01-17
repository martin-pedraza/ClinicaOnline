import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { SpecialistService } from '../services/specialist.service';

export function specialistExistValidator(
  service: SpecialistService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const dni = control.value;
    const errorAnswer = { specialistExist: '(Ya existe)' };

    return service.getSpecialistList().pipe(
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
