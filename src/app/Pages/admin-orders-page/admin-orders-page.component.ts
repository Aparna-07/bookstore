import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-orders-page',
  templateUrl: './admin-orders-page.component.html',
  styleUrls: ['./admin-orders-page.component.css']
})
export class AdminOrdersPageComponent implements OnInit {

  orders:any;
  qty = new Map();
  books = new Map();

  constructor(private dataService:DataService) {    
    dataService.getAllOrders().subscribe((ordersResponse:any)=>{
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
