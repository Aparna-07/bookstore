import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate()
  {
    console.log(localStorage.getItem("admin")=="true");
    if(localStorage.getItem("user") && localStorage.getItem("admin")=="true")
    {
      return true;
    }
    else{
      this.router.navigateByUrl('login');
      return false;
    }
  }
  
}