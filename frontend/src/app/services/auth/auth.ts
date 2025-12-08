import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { enviroment } from '@env';

interface LoginResponse {
    token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiURL = enviroment.apiUrl;

    private accessToken: string | null = null;

    constructor(private http: HttpClient) { }

    public getAccessToken(): string | null {
        return this.accessToken;
    }
    register(userData: any): Observable<any> {
        const url = `${this.apiURL}/register`

        return this.http.post<any>(url, userData);
    }
    login(userData: any): Observable<LoginResponse> {
        const url = `${this.apiURL}/login`

        return this.http.post<LoginResponse>(url, userData).pipe(
            tap(response => {
                this.accessToken = response.token;
                console.log("Token guardado en memoria.");
            })
        );
    }
    logout(): void {
        this.accessToken = null;
        console.log("Token eliminado de la memoria.");
    }
}