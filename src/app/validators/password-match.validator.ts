import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pass = control.get('password');
  const confirm = control.get('confirmPassword');

  if (!pass || !confirm) return null;

  return pass.value === confirm.value ? null : { passwordMismatch: true };
}
