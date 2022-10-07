import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginResponse: any;
  loginClass: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (localStorage.getItem("user")) {
      if (localStorage.getItem("admin")=='true') {
        router.navigateByUrl('admin');
      }
      else {
        router.navigateByUrl('home');
      }
    }
  }

  myForm = this.fb.group(
    {
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, [Validators.required]]
    }
  )

  get email() {
    return this.myForm.get('Email');
  }
  get password() {
    return this.myForm.get('Password');
  }
  ngOnInit(): void {
  }

  Login() {
    this.auth.login(this.myForm.value).subscribe((response: any) => {
      if (response.IsActive) {
        this.loginResponse = 'Login successful!';
        this.loginClass = 'alert-success';
        let user={
          UserId: response.UserId,
          UserName: response.UserName,
          Email: response.Email
        }
        localStorage.setItem("user", JSON.stringify(user));
          if (response.IsAdmin) {
            this.router.navigateByUrl('admin');
            localStorage.setItem("admin", "true");
          }
          else {
            this.router.navigateByUrl('home');
            localStorage.setItem("admin", "false");
          }
      }
      else{
        this.loginResponse = 'This account is deactivated';
        this.loginClass = 'alert-danger';
      }
    },
      (error) => {
        this.loginResponse = 'Incorrect email or password';
        this.loginClass = 'alert-danger';
      });
  }

}
