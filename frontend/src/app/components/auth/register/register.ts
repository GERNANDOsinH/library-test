import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth/auth';
import { Router } from '@angular/router';

export const passwordsMatchValidator = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
        return { passwordsNotMatching: true };
    }
    return null;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {
    constructor(private authService: AuthService, private router: Router) { }

    passwordVisible: boolean = false;
    repeatPasswordVisible: boolean = false;

    registerForm = new FormGroup({
        first_name: new FormControl('', [
            Validators.required
        ]),
        last_name: new FormControl('', [
            Validators.required
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(7)
        ]),
        repeatPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(7)
        ])
    }, { validators: passwordsMatchValidator });

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }

    toggleRepeatPasswordVisibility() {
        this.repeatPasswordVisible = !this.repeatPasswordVisible;
    }

    onSubmit() {
        this.registerForm.markAllAsTouched();

        if (this.registerForm.valid) {
            const userData = this.registerForm.value;
            this.authService.register(userData).subscribe({
                next: (response) => {
                    console.log('Registro exitoso: ', response);
                    this.router.navigate(['/auth']);
                },
                error: (err) => {
                    console.error('Error durante el registro:', err);
                    alert('Error al registrar: ' + (err.error?.message || 'Error de conexión.'));
                },                
                complete: () => {
                    console.log('Llamada a API de registro finalizada.');
                }
                })
        }
        else {
            console.error("El formulario no es válido")
            alert("Por favor, ingrese un email y contraseña validos")
        }
    }
}
