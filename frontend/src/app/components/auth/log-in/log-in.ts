import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
    passwordVisible: boolean = false;

    constructor(private authService: AuthService, private router: Router){ }

    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(7)
        ])
    });

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const userData = this.loginForm.value;
            this.authService.login(userData).subscribe({
                next: (response) => {
                    console.log('Inicio de sesión exitoso', response);
                    this.router.navigate(['/home']);
                },
                error: (err) => {
                    console.error('Error durante el inicio de sesión: ', err);
                    alert('Error al iniciar sesión: ' + (err.error?.message || 'Error de conexión.'));
                },
                complete: () => {
                    console.log('Llamada de api finalizada')
                }
            })
        }
        else {
            console.error("El formulario no es válido")
            alert("Por favor, ingrese un email y contraseña validos")
        }

    }
}
