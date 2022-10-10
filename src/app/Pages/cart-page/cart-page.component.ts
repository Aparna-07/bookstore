import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  books:any[]=[];
  cart:any
  qty = new Map();
  subtotal:any;
  newSubtotal:any;
  itemCount:number=0;
  userId:any;
  coupons:any;
  selectedCoupon:any;
  couponCount:any;
  orderId:any;
  empty:boolean = false;
  orderPlaced:boolean=false;

  constructor(private dataService:DataService, private datePipe:DatePipe) {
    this.userId = JSON.parse(localStorage.getItem("user")!).UserId;

    dataService.getCart(this.userId).subscribe((response:any)=>{
      if(response.length==0){
        this.empty=true;
      }
      else
      {
        this.cart=response;
        this.itemCount = this.cart.length;
        this.cart.forEach((item:any) => {
          dataService.getBookByBookId(item.BookId).subscribe((book:any)=>{
            this.books.push(book);
            this.qty.set(book.BookId, item.Qty);
          })
        });
      }
    });

    dataService.getCartTotal(this.userId).subscribe((response:any)=>{
      this.subtotal = response;

      dataService.getCoupons(this.subtotal).subscribe((response)=>{
        this.coupons = response;
        this.couponCount=this.coupons.length;
      });

    });

   }

  ngOnInit(): void {
  }

  qtyChanged(myQty:any, bookId:any){
    if(!myQty.validity.valid){
      myQty.value=this.qty.get(bookId);
    }
    else{
      let cart={
        "UserId":this.userId,
        "BookId": bookId,
        "Qty": myQty.value
      }
      this.dataService.updateCart(cart).subscribe((response:any)=>{
        console.log(cart)
        myQty.value=response.Qty;
        this.qty.set(bookId, response.Qty);
        window.location.reload();
      })
    }
  }

  deleteCart(bookId:any){
    let cart={
      "UserId":JSON.parse(localStorage.getItem("user")!).UserId,
      "BookId":bookId,
      "Qty":0
    }
    this.dataService.deleteFromCart(cart).subscribe((response:any)=>{
      window.location.reload();
    })
   }

   couponSelected(value:any){
    this.dataService.getCouponByCode(value).subscribe((response:any)=>{
      this.selectedCoupon=response;
      this.newSubtotal = this.subtotal - response.Discount;
    })
   }

  checkout(){
    let today = new Date();
    let order={
      "OrderDate": this.datePipe.transform(today, 'yyyy-MM-dd'),
      "Amount": this.newSubtotal,
      "UserId": this.userId
    };
    this.dataService.addOrder(order).subscribe((response)=>{
      this.orderId=response;
      this.qty.forEach((value, key) => {
        let item={
          "OrderId": this.orderId,
          "BookId": key,
          "Qty": value
        };
        this.dataService.addOrderItem(item).subscribe();
      });
      this.dataService.deleteWholeCart(this.userId).subscribe(()=>{
        this.empty=true;
        this.orderPlaced=true;
      }); 
    });
  }

}
