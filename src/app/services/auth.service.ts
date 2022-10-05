import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Credentials, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  login(cred:Credentials){
    return this.http.post('http://localhost:59501/api/auth/login', cred)    
  }

  register(user:User){
    return this.http.post('http://localhost:59501/api/auth', user)    
  }

  checkAdmin(email:string){
    return this.http.get('http://localhost:59501/api/auth', {params: {email:email}})
  }
}
