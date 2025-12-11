import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from '@components/home/home';
import { Auth } from '@components/auth/auth';
import { Search } from '@components/search/search';
import { Carrito } from '@components/carrito/carrito';
import { Account } from '@components/account/account';

export const routes: Routes = [ 
    { path: 'home', component: Home },
    { path: 'auth', component: Auth },
    { path: 'catalogo', component: Search },
    { path: 'me', component: Account },
    { path: 'cart', component: Carrito },
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
];