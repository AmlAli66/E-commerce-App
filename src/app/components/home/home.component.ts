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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainBtnComponent, MainSliderComponent, CategoriesSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  private readonly toastr = inject(ToastrService)
  constructor(private _ProductsService: ProductsService, private token: AuthService, private _CartService: CartService) {
    this.token.saveUserData()
  }
  getProducts = () => {
    this._ProductsService.getProducts().subscribe({
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
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
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

}
