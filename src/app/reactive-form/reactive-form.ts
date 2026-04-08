import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { passwordMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrls: ['./reactive-form.scss'],
})
export class ReactiveFormComponent implements OnInit {
  regForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private regService: RegistrationService,
    private router: Router,
  ) {}

  //Коли компонент завантажується, за допомогою FormBuilder створюється структура форми regForm. 
  // Для кожного поля прописані правила (Validators):
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

  //геттер, який дозволяє коротко звертатися до полів форми в HTML 
  get f() {
    return this.regForm.controls;
  }

  //спрацьовує при натисканні зареєструватися
  onSubmit(): void {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { passwords, ...rest } = this.regForm.value;
    const payload = { ...rest, password: passwords.password };


    //запит до сервера 
    this.regService.register(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/cv']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Помилка реєстрації';
      },
    });
  }
//очищення заповненої форми 
  resetForm(): void {
    this.regForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
