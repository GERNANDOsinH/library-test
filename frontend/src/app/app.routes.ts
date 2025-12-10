import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from '@components/home/home';
import { Auth } from '@components/auth/auth';

export const routes: Routes = [ 
    { path: 'home', component: Home },
    { path: 'auth', component: Auth },
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
];