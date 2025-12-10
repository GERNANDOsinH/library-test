import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
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
