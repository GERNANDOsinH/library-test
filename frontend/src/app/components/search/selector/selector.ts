import { Component } from '@angular/core';
import { Input, OnInit, Output, EventEmitter } from '@angular/core';

interface Book {
    id: number
    title: string
    author: string
    quantity: string
    popularity_score : number
    price: number
}

@Component({
  selector: 'app-selector',
  templateUrl: './selector.html',
  styleUrl: './selector.css',
})
export class Selector {
    constructor() {}

    @Input()
    libro: Book = {} as Book;
    @Output()
    libro_en_el_carrito: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

    addToCart() {
        this.libro_en_el_carrito.emit([this.libro.id, this.libro.price]);
    }
}
