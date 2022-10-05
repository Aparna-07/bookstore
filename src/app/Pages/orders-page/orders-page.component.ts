import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {
  
  books = new Map();
  orders:any;
  qty=new Map();
  userId:any;

  constructor(private dataService:DataService) {
    this.userId = JSON.parse(localStorage.getItem("user")!).UserId;

    dataService.getOrdersByUser(this.userId).subscribe((ordersResponse:any)=>{
      this.orders=ordersResponse;
      this.orders.forEach((order:any) => {
        this.dataService.getOrderItems(order.OrderId).subscribe((itemsResponse:any)=>{
          itemsResponse.forEach((item:any) => {
            this.dataService.getBookByBookId(item.BookId).subscribe((bookResponse:any)=>{
              this.qty.set(bookResponse.BookId, item.Qty)
              if(this.books.has(item.OrderId)){
                this.books.get(item.OrderId).push(bookResponse);
              }
              else
              this.books.set(item.OrderId, [bookResponse]);
            });
          });
        });
      });
    });
   }

  ngOnInit(): void {
  }

}
