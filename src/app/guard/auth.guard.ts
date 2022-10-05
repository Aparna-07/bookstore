import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate()
  {
    if(localStorage.getItem("user") && localStorage.getItem("admin")=="false")
    {
      return true;
    }
    else{
      this.router.navigateByUrl('login');
      return false;
    }
  }
  
}
