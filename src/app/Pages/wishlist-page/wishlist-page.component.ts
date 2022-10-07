import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {

  books: any[] = [];
  wishlist: any;
  empty: boolean = false;

  constructor(private dataService: DataService) {
    dataService.getWishlist(JSON.parse(localStorage.getItem("user")!).UserId).subscribe((response: any) => {
      if (response.length == 0)
        this.empty = true;
      else {
        this.wishlist = response;
        this.wishlist.forEach((item: any) => {
          dataService.getBookByBookId(item.BookId).subscribe((book: any) => {
            this.books.push(book);
          })
        });
      }
    });
  }

  deleteWishlist(bookId: any) {
    let wishlist = {
      "UserId": JSON.parse(localStorage.getItem("user")!).UserId,
      "BookId": bookId
    }
    this.dataService.deleteFromWishlist(wishlist).subscribe((response: any) => {
      window.location.reload();
    })
  }

  moveToCart(bookId: any) {
    let wishlist = {
      "UserId": JSON.parse(localStorage.getItem("user")!).UserId,
      "BookId": bookId
    }
    let cart = {
      "UserId": JSON.parse(localStorage.getItem("user")!).UserId,
      "BookId": bookId,
      "Qty": 1
    }
    this.dataService.addToCart(cart).subscribe();
    this.dataService.deleteFromWishlist(wishlist).subscribe((response: any) => {
      window.location.reload();
    });
  }
  ngOnInit(): void {
  }

}
