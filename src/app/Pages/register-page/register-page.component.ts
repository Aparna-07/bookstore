import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  user = new User();
  constructor(private fb:FormBuilder) { }

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
    console.log(this.user);
  }

}
