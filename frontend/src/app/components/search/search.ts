import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth/auth';
import { BooksService } from '@services/books/books';
import { Selector } from './selector/selector';

interface Book {
    id: number
    title: string
    author: string
    quantity: string
    popularity_score : number
}

@Component({
  selector: 'app-search',
  imports: [Selector],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
    constructor(
        private authService: AuthService,
        private bookService: BooksService,
        private router: Router){ }

    public books: Book[] = [];
    
    private limit: number = 50;
    private offset: number = 0;
    private is_looking_the_most_popular: boolean = false;

    private token: string | null = null;

    ngOnInit(): void {
        this.token = this.authService.getAccessToken();

        if (this.token === null) 
            this.router.navigate(['/auth']);
        
        this.searchBooks();
    }

    searchBooks () {
        if (!this.is_looking_the_most_popular){
            this.bookService.get_books(this.limit, this.offset).subscribe({
                next: (response) => {
                    this.books = response.books;
                    console.log("Se cargaron los libros");
                },
                error: (err) => {
                    console.log("Hubo un error al cargar los libros");
                    alert('Hubo un error' + (err.error?.message || 'Error de conexión.'));
                },
                complete: () => {
                    console.log("Llamada realizada correctamente");
                }
            })
        }
        else {
            this.bookService.get_populars(this.limit, this.offset).subscribe({
                next: (response) => {
                    console.log("Se cargaron los libros");
                },
                error: (err) => {
                    console.log("Hubo un error al cargar los libros");
                    alert('Hubo un error' + (err.error?.message || 'Error de conexión.'));
                },
                complete: () => {
                    console.log("Llamada realizada correctamente");
                }
            })
        }
    }

}
