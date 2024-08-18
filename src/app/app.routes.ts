import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'login', component: SigninComponent, title: 'Login Page' },
      { path: 'signup', component: SignupComponent, title: 'Sign up  Page' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'categories', component: CategoriesComponent, title: 'Categories' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'orders', component: OrdersComponent, title: 'Orders' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found Page' },
];
