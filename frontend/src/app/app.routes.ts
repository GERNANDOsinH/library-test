import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from '@components/home/home';
import { LogIn } from '@components/auth/log-in/log-in';

export const routes: Routes = [ 
    { path: 'home', component: Home },
    { path: 'auth', component: LogIn },
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
];