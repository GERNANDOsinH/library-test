import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from '@components/home/home';
import { Auth } from '@components/auth/auth';
import { Search } from '@components/search/search';

export const routes: Routes = [ 
    { path: 'home', component: Home },
    { path: 'auth', component: Auth },
    { path: 'catalogo', component: Search },
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
];