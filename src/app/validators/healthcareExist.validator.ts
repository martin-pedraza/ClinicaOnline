import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { HealthcareService } from '../services/healthcare.service';

export function healthcareExistValidator(
  service: HealthcareService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const healthcare = control.value;
    const errorAnswer = { healthcareExist: '(Ya existe)' };

    return service.getHealthcareList().pipe(
      map((hcs) => {
        for (let index = 0; index < hcs.length; index++) {
          const element = hcs[index];

          if (element['name'] == healthcare) {
            control.setErrors(errorAnswer);
            return errorAnswer;
          }
        }
        return null;
      })
    );
  };
}
