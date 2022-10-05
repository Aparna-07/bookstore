import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials, User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginResponse:any;
  loginClass:any;

  cred = new Credentials();
  constructor(private fb:FormBuilder, private auth:AuthService, private router: Router) { 
    if(localStorage.getItem("user")){
      if(localStorage.getItem("admin")){
        router.navigateByUrl('admin');
      }
      else{
        router.navigateByUrl('home');
      }
    }
  }

  myForm =  this.fb.group(
    {
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]]
    }
  )

  get email(){
    return this.myForm.get('email');
  }
  get password(){
    return this.myForm.get('password');
  }
  ngOnInit(): void {
  }

  Login(){
    this.auth.login(this.cred).subscribe((response:any)=>{
      if(response!=null){
        this.loginResponse='Login successful!';
        this.loginClass = 'alert-success';
        localStorage.setItem("user", JSON.stringify(response));
        this.auth.checkAdmin(response.Email).subscribe((value:any)=>{
          console.log(value);
          if(value==true){
              this.router.navigateByUrl('admin');
              localStorage.setItem("admin", "true");
          }
            else{
              this.router.navigateByUrl('home');
              localStorage.setItem("admin", "false");
            }
        })
      }
    },
    (error)=>{
      this.loginResponse='Incorrect email or password';
      this.loginClass = 'alert-danger';
    });
  }

}
