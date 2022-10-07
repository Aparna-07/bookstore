import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  login(cred:any){
    return this.http.post('http://localhost:59501/api/auth/login', cred)    
  }

  register(user:any){
    return this.http.post('http://localhost:59501/api/auth', user)    
  }
}
