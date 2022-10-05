import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

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
