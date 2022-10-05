import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params, ROUTER_CONFIGURATION } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  baseUrl = 'http://localhost:59501/api/';

  getAllCategories(){
    return this.http.get(this.baseUrl+'category');
  }

  getFeaturedBooks(){
    return this.http.get(this.baseUrl+'book/getbyfeatured');
  }

  getAllBooks(){
    return this.http.get(this.baseUrl+'book');
  }

  getBookByCatId(id:number){
    return this.http.get(this.baseUrl+'book/getbycatid', {params:{id:id}});
  }

  getBookByBookId(id:number){
    return this.http.get(this.baseUrl+'book/getbyid', {params:{id:id}});
  }

  getBookBySearch(searchBy:any, search:any){
    switch(searchBy){
      case "Title":
        return this.http.get(this.baseUrl+'book/getbytitle', {params:{name:search}});
      case "Author":
        return this.http.get(this.baseUrl+'book/getbyauthor', {params:{author:search}});
      case "ISBN":
        return this.http.get(this.baseUrl+'book/getbyisbn', {params:{isbn:search as number}});
      case "CategoryName":
        return this.http.get(this.baseUrl+'book/getbycatname', {params:{name:search}});
    }
    return;
  }

  getCart(userId:number){
    return this.http.get(this.baseUrl+'cart', {params:{userId:userId}});
  }

  addToCart(cart:any){
    return this.http.post(this.baseUrl+'cart', cart);
  }

  updateCart(cart:any){
    return this.http.put(this.baseUrl+'cart', cart);
  }

  deleteFromCart(cart:any){
    return this.http.delete(this.baseUrl+'cart', {body:cart});
  }

  deleteWholeCart(userId:number){
    return this.http.delete(this.baseUrl+'cart/deletecart', {params:{userId:userId}});
  }

  getCartTotal(userId:number){
    return this.http.get(this.baseUrl+'cart/gettotal', {params:{userId:userId}});
  }

  getWishlist(userId:number){
    return this.http.get(this.baseUrl+'wishlist', {params:{userId:userId}});
  }

  addToWishlist(wishlist:any){
    return this.http.post(this.baseUrl+'wishlist', wishlist);
  }

  deleteFromWishlist(wishlist:any){
    return this.http.delete(this.baseUrl+'wishlist', {body:wishlist});
  }

  getAllOrders(){
    return this.http.get(this.baseUrl+'order');
  }

  getOrdersByUser(userId:any){
    return this.http.get(this.baseUrl+'order/getbyuser', {params:{userId:userId}});
  }

  getOrderItems(orderId:any){
    return this.http.get(this.baseUrl+'order/getitems', {params:{orderId:orderId}});
  }

  addOrder(order:any){
    return this.http.post(this.baseUrl+'order', order);
  }

  addOrderItem(item:any){
    return this.http.post(this.baseUrl+'order/item', item);
  }

  getAddress(userId:number){
    return this.http.get(this.baseUrl+'address', {params:{userId:userId}});
  }

  updateAddress(address:any){
    return this.http.put(this.baseUrl+'address', address);
  }

  getCoupons(total:any){
    return this.http.get(this.baseUrl+'coupon', {params:{total:total}});
  }

  getAllCoupons(){
    return this.http.get(this.baseUrl+'coupon');
  }

  getCouponByCode(code:any){
    return this.http.get(this.baseUrl+'coupon/getbycode', {params:{code:code}});
  }

  // ADMIN

  insertCategory(cat:any){
    return this.http.post(this.baseUrl+'category', cat);
  }

  updateCategory(cat:any){
    return this.http.put(this.baseUrl+'category', cat);
  }

  deleteCategory(id:any){
    return this.http.delete(this.baseUrl+'category', {params:{id:id}});
  }
  getCategoryByName(name:any){
    return this.http.get(this.baseUrl+'category/getbyname', {params:{name:name}});
  }

  insertBook(book:any){
    return this.http.post(this.baseUrl+'book', book);
  }

  updateBook(book:any){
    return this.http.put(this.baseUrl+'book', book);
  }

  deleteBook(id:any){
    return this.http.delete(this.baseUrl+'book', {params:{id:id}});
  }
  updateCoupon(coupon:any){
    return this.http.put(this.baseUrl+'coupon', coupon);
  }  
  deleteCoupon(code:string){
    return this.http.delete(this.baseUrl+'coupon', {params:{code:code}});
    // return this.http.delete(this.baseUrl+'coupon', code);
  }  
  insertCoupon(coupon:any){
    return this.http.post(this.baseUrl+'coupon', coupon);
  }
}
