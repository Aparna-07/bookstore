import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  categories:any;
  couponCount:number=0;
  bookCount:number=0;
  orderCount:number=0;
  userCount:number=0;

  constructor(private dataService:DataService, private router:Router) { 
    dataService.getAllCategories().subscribe((response:any)=>{
      if(response != null){
        this.categories = response;
      }
    });

    dataService.getAllOrders().subscribe((response:any)=>{
      this.orderCount = response.length;
    });
    
    dataService.getAllBooks().subscribe((response:any)=>{
      this.bookCount = response.length;
    });
    
    dataService.getAllCoupons().subscribe((response:any)=>{
      this.couponCount = response.length;
    });

    dataService.getAllUsers().subscribe((response:any)=>{
      this.userCount = response.length;
    });
}

  catSelected(id:any){
    this.router.navigate(['admin/books', {id:id}]);
  }

  ngOnInit(): void {
  }
}