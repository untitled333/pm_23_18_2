import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { passwordMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reactive-form.html',
  styleUrls: ['./reactive-form.scss'],
})
export class ReactiveFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private regService = inject(RegistrationService);
  private router = inject(Router);

  regForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.regForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]],
          confirmPassword: ['', Validators.required],
        },
        { validators: passwordMatchValidator },
      ),
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  get f() {
    return this.regForm.controls;
  }

  onSubmit(): void {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { passwords, agreeTerms, ...rest } = this.regForm.value;
    const payload = { ...rest, password: passwords.password };

    this.regService.register(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Реєстрацію завершено! Тепер увійдіть в систему.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Помилка реєстрації';
      },
    });
  }

  resetForm(): void {
    this.regForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
