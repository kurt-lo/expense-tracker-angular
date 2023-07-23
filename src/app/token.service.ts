import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    private tokenKey = 'token';
  
    setToken(token: string) {
      localStorage.setItem(this.tokenKey, token);
    }
  
    getToken(): string {
        const token = localStorage.getItem(this.tokenKey);
        return token as string;
      }
      
  
    clearToken() {
      localStorage.removeItem(this.tokenKey);
    }
  }