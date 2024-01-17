import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function repeatPasswordValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password');
    const repeatPassword = formGroup.get('repeatPassword');
    const errorAnswer = { noMatch: '(La clave no coincide)' };

    if (password?.value !== repeatPassword?.value) {
      repeatPassword?.setErrors(errorAnswer);
      return errorAnswer;
    } else {
      repeatPassword?.setErrors(null);
      return null;
    }
  };
}
