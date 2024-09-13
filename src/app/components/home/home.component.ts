import { SearchPipe } from './../../core/pipes/search.pipe';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/intarfaces/product';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { AuthService } from '../../core/services/auth.service';
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategoriesSliderComponent } from "../categories-slider/categories-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, SearchPipe, SoldOutPipe, UpperCasePipe, MainBtnComponent, MainSliderComponent, CategoriesSliderComponent, RouterLink, DatePipe, FormsModule, NgxSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  term: string = ""
  allProducts: Product[] = [];
  cancelSubscription: Subscription = new Subscription()
  private readonly toastr = inject(ToastrService);
  private readonly _WishListService = inject(WishListService);
  constructor(private _ProductsService: ProductsService, private token: AuthService, private _CartService: CartService) {
    this.token.saveUserData()
  }
  getProducts = () => {
    this.cancelSubscription = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  ngOnInit(): void {
    this.getProducts();
  }
  addToCart = (productId: string) => {
    this.cancelSubscription = this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        // console.log(res);
        this._CartService.cartCounter.next(res.numOfCartItems)
        this.toastr.success('Added to cart successfully', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 1000
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  addToWishList = (productId: string) => {
    this.cancelSubscription = this._WishListService.addToWishList(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCounter.next(res.numOfCartItems)
        this.toastr.success(res.message, '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 1000
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }
}
