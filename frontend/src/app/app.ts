import { Component, signal } from '@angular/core';
import { LogIn } from '@components/auth/log-in/log-in';
import { Home } from '@components/home/home';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LogIn, RouterOutlet, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('frontend');

    isLoggedIn: boolean = false;
    
    constructor() {}
    
    onLoginComplete(isSuccess: boolean): void {
        if (isSuccess) {
            this.isLoggedIn = true;
        }
    }
}
