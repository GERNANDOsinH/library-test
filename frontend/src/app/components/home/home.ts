import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    constructor(private router: Router) {}

    goToCatalog() {
        this.router.navigate(['/catalogo']);
    }
    goToCart() {
        this.router.navigate(['/cart']);
    }
    goToAccount() {
        this.router.navigate(['/me']);
    }
}