import { ProductsService } from './../../core/services/products.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/intarfaces/product';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { NgFor } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MainBtnComponent, NgFor],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  product!: Product;
  rating!: number;
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly toastr = inject(ToastrService)
  ngOnInit(): void {
    let id: string | null = " ";

    this._ActivatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          console.log(params.get('id'))
          id = params.get('id')
        }
      }
    )

    this._ProductsService.getProduct(id).subscribe({
      next: (product) => {
        console.log(product.data)
        this.product = product.data;
        this.rating = product.ratingsQuantity
      }
    })
  }
  getStars(rating: number) {
    let stars = [];
    for (let i = 1; i <= rating; i++) {
      // console.log(rating);
      stars.push(i)
    }
    return stars;
  }

  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
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
}
