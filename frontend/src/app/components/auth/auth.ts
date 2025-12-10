import { Component } from '@angular/core';

import { Register } from './register/register';
import { LogIn } from './log-in/log-in';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LogIn, Register],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
    isLogging: boolean = true;

    change() {
        this.isLogging = !this.isLogging;
    }
}
