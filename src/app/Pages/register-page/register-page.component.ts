import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerResponse:any;
  registerClass:any;

  constructor(private fb:FormBuilder, private auth:AuthService, private router: Router) { }

  myForm =  this.fb.group(
    {
      UserId:[],
      UserName:[null, [Validators.required]],
      Email:[null, [Validators.required, Validators.email]],
      Mobile:[null, [Validators.required]],
      Password:[null, [Validators.required]],
      IsActive:[1],
      IsAdmin:[0]
    }
  )

  get name(){
    return this.myForm.get('UserName');
  }
  get email(){
    return this.myForm.get('Email');
  }
  get mobile(){
    return this.myForm.get('Mobile');
  }
  get password(){
    return this.myForm.get('Password');
  }
  ngOnInit(): void {
  }

  Register(){
    this.auth.register(this.myForm.value).subscribe((response)=>{
      this.router.navigateByUrl('login');
    },
    (error)=>{
      this.registerResponse = "Registration failed, try again!";
      this.registerClass = "alert-danger";
    }
    );
  }

}
