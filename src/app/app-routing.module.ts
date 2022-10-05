import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { BookDetailPageComponent } from './pages/book-detail-page/book-detail-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { AdminCategoriesPageComponent } from './pages/admin-categories-page/admin-categories-page.component';
import { AdminBooksPageComponent } from './pages/admin-books-page/admin-books-page.component';
import { AdminCouponsPageComponent } from './pages/admin-coupons-page/admin-coupons-page.component';
import { AdminOrdersPageComponent } from './pages/admin-orders-page/admin-orders-page.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'contact', component:ContactPageComponent},
  {path:'about', component:AboutPageComponent},
  {path:'home', component:HomePageComponent, canActivate:[AuthGuard]},
  {path:'books', component:BooksPageComponent, canActivate:[AuthGuard]},
  {path:'details/:id', component:BookDetailPageComponent, canActivate:[AuthGuard]},
  {path:'cart', component:CartPageComponent, canActivate:[AuthGuard]},
  {path:'wishlist', component:WishlistPageComponent, canActivate:[AuthGuard]},
  {path:'orders', component:OrdersPageComponent, canActivate:[AuthGuard]},
  {path:'admin', component:AdminHomePageComponent, canActivate:[AdminGuard]},
  {path:'admin/categories', component:AdminCategoriesPageComponent, canActivate:[AdminGuard]},
  {path:'admin/books', component:AdminBooksPageComponent, canActivate:[AdminGuard]},
  {path:'admin/coupons', component:AdminCouponsPageComponent, canActivate:[AdminGuard]},
  {path:'admin/orders', component:AdminOrdersPageComponent, canActivate:[AdminGuard]},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
