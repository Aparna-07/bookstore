import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css']
})
export class UserDetailsPageComponent implements OnInit {

  nameReadonly:boolean=true;
  emailReadonly:boolean=true;
  user = JSON.parse(localStorage.getItem("user")!);
  address:any;
  duplicateEmail:boolean = false;

  myAddressForm=this.fb.group({
    Building:[,[]],
    City: [,[]],
    Country: [,[]],
    Pincode:[,[]],
    UserId: [this.user.UserId,[]]
  });

  myPasswordForm=this.fb.group({
    Current:[, [Validators.required, this.checkCurrentPass.bind(this)]],
    New:[, [Validators.required]],
    // Confirm:[, [Validators.required]]
  });

  constructor(private router:Router, private fb:FormBuilder, private dataService:DataService) { 
    dataService.getAddress(this.user.UserId).subscribe((response)=>{
      this.address=response;
      this.myAddressForm.controls.Building.setValue(this.address.Building);
      this.myAddressForm.controls.City.setValue(this.address.City);
      this.myAddressForm.controls.Country.setValue(this.address.Country);
      this.myAddressForm.controls.Pincode.setValue(this.address.Pincode);
    });
  }

  get current() {
    return this.myPasswordForm.get('Current');
  }
  get new() {
    return this.myPasswordForm.get('New');
  }


  ngOnInit(): void {
  }

  updateAddress(){
    this.dataService.updateAddress(this.myAddressForm.value).subscribe((response)=>{
      window.location.reload();
    })
  }

  checkCurrentPass(c:AbstractControl):{invalid:boolean}|null{
    if(c.value!=this.user.Password){
      return {invalid:true};
    }
    return null;
  }
  passwordChanged(){
    this.dataService.updatePassword(this.myPasswordForm.value.New!, this.user.UserId).subscribe((response:any)=>{
      localStorage.setItem("user", JSON.stringify(response));
      window.location.reload();
    })
  }

  nameChanged(input:any){
    this.nameReadonly=true;
    let name=input.value;
    if(name != this.user.UserName && name!=''){
      this.dataService.updateUsername(name, this.user.UserId).subscribe((response:any)=>{
        localStorage.setItem("user", JSON.stringify(response));
        window.location.reload();
      });
    }
    else{
      input.value = this.user.UserName;
    }
  }
  emailChanged(input:any){
    this.emailReadonly=true;
    let email = input.value
    if(email != this.user.Email && email!=''){
      this.dataService.checkDuplicateEmail(email).subscribe((response1:any)=>{
        if(response1){
          this.duplicateEmail=true;
          input.value = this.user.Email;
        }
        else{
          this.duplicateEmail = false;
          this.dataService.updateEmail(email, this.user.UserId).subscribe((response2:any)=>{
            localStorage.setItem("user", JSON.stringify(response2));
          });    
        }
      });
    }
    else{
      input.value = this.user.Email;
    }
  }
}
