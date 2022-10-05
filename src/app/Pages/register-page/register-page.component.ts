import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  user = new User();
  registerResponse:any;
  registerClass:any;

  constructor(private fb:FormBuilder, private auth:AuthService, private router: Router) { }

  myForm =  this.fb.group(
    {
      name:[null, [Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      mobile:[null, [Validators.required]],
      password:[null, [Validators.required]]
    }
  )

  get name(){
    return this.myForm.get('name');
  }
  get email(){
    return this.myForm.get('email');
  }
  get mobile(){
    return this.myForm.get('mobile');
  }
  get password(){
    return this.myForm.get('password');
  }
  ngOnInit(): void {
  }

  Register(){
    this.auth.register(this.user).subscribe((response)=>{
      this.router.navigateByUrl('login');
    },
    (error)=>{
      this.registerResponse = "Registration failed, try again!";
      this.registerClass = "alert-danger";
    }
    )
  }

}
