import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { BooksComponent } from './components/books/books.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { CatAdminComponent } from './components/cat-admin/cat-admin.component';
import { BookAdminComponent } from './components/book-admin/book-admin.component';
import { CouponAdminComponent } from './components/coupon-admin/coupon-admin.component';
import { OrdersAdminComponent } from './components/orders-admin/orders-admin.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailPageComponent } from './pages/book-detail-page/book-detail-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { DatePipe } from '@angular/common';
import { AdminBooksPageComponent } from './pages/admin-books-page/admin-books-page.component';
import { AdminCouponsPageComponent } from './pages/admin-coupons-page/admin-coupons-page.component';
import { AdminOrdersPageComponent } from './pages/admin-orders-page/admin-orders-page.component';
import { AdminCategoriesPageComponent } from './pages/admin-categories-page/admin-categories-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    HomeContentComponent,
    BooksPageComponent,
    BooksComponent,
    AboutPageComponent,
    ContactPageComponent,
    CatAdminComponent,
    BookAdminComponent,
    CouponAdminComponent,
    OrdersAdminComponent,
    AdminHomePageComponent,
    AdminNavbarComponent,
    AdminHeaderComponent,
    BookDetailPageComponent,
    CartPageComponent,
    WishlistPageComponent,
    OrdersPageComponent,
    AdminBooksPageComponent,
    AdminCouponsPageComponent,
    AdminOrdersPageComponent,
    AdminCategoriesPageComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
