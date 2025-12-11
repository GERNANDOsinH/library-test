import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { enviroment } from '@env';

interface Book {
    id: number
    title: string
    author: string
    quantity: number
    popularity_score : number
    price: number
}

interface BooksResponse {
    books: Book[]
}

interface BookResponse {
    book: Book
}


@Injectable({
  providedIn: 'root',
})
export class BooksService {
    private apiUrl = enviroment.apiUrl;

    constructor(private http: HttpClient) { }

    public get_books(limit: number, offset: number): Observable<BooksResponse> {
        const url = `${this.apiUrl}/libros`

        let params = new HttpParams();
        params = params.set('limit', limit.toString());
        params = params.set('offset', offset.toString());


        return this.http.get<BooksResponse>(url, {params: params});
    }
    public get_book(id: number): Observable<BookResponse> {
        const url = `${this.apiUrl}/libros/${id}`
    
        return this.http.get<BookResponse>(url);
    }
    public get_populars(limit: number, offset: number): Observable<BooksResponse> {
        const url = `${this.apiUrl}/libros/popular`
        
        let params = new HttpParams();
        params = params.set('limit', limit.toString());
        params = params.set('offset', offset.toString());

        return this.http.get<BooksResponse>(url, {params: params});
    }
}
