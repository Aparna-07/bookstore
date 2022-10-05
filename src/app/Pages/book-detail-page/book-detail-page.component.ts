import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-detail-page',
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.css']
})
export class BookDetailPageComponent implements OnInit {

  id:any;
  book:any;
  qty:any

  myCartForm = this.fb.group({
    qty:[1]
  })

  constructor(private dataService: DataService, private activatedRoute:ActivatedRoute, private fb:FormBuilder){
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getBookByBookId(this.id).subscribe((response:any)=>{
      if(response!=null)
        this.book=response;
    });
   }

  ngOnInit(): void {
  }

  addToCart(){
    let cart = {
      "UserId" : JSON.parse(localStorage.getItem("user")!).UserId,
      "BookId" : this.id,
      "Qty" : this.myCartForm.value.qty
    }
    // this.dataService.addToCart(cart);
    this.dataService.addToCart(cart).subscribe((response:any)=>{
      console.log(response);
    })
  }

  addToWishlist(){
    let wishlist = {
      "UserId" : JSON.parse(localStorage.getItem("user")!).UserId,
      "BookId" : this.id,
    }
    // this.dataService.addToCart(cart);
    this.dataService.addToWishlist(wishlist).subscribe((response:any)=>{
      console.log(response);
    })
  }
}
