import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  address:any;

  userName = JSON.parse(localStorage.getItem("user")!).UserName;
  email = JSON.parse(localStorage.getItem("user")!).Email;

  constructor(private router:Router) { 
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
