import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { AdminService } from '../services/admin.service';

export function adminExistValidator(service: AdminService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const dni = control.value;
    const errorAnswer = { adminExist: '(Ya existe)' };

    return service.getAdminList().pipe(
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
