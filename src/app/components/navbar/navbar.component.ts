import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  address:any;

  userName = JSON.parse(localStorage.getItem("user")!).UserName;
  email = JSON.parse(localStorage.getItem("user")!).Email;
  userId = JSON.parse(localStorage.getItem("user")!).UserId;

  myAddressForm=this.fb.group({
    Building:[,[]],
    City: [,[]],
    Country: [,[]],
    Pincode:[,[]],
    UserId: [this.userId,[]]
  });
  constructor(private router:Router, private fb:FormBuilder, private dataService:DataService) { 
    dataService.getAddress(this.userId).subscribe((response)=>{
      this.address=response;
      this.myAddressForm.controls.Building.setValue(this.address.Building);
      this.myAddressForm.controls.City.setValue(this.address.City);
      this.myAddressForm.controls.Country.setValue(this.address.Country);
      this.myAddressForm.controls.Pincode.setValue(this.address.Pincode);
    });
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  updateAddress(){
    this.dataService.updateAddress(this.myAddressForm.value).subscribe((response)=>{
      window.location.reload();
    })
  }

}
