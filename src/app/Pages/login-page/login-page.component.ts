import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from 'src/app/Models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  cred = new Credentials();
  constructor(private fb:FormBuilder) { }

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
    console.log(this.cred);
  }

}
