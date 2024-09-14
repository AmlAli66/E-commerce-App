import { Component, inject } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from '../../core/intarfaces/wishlist';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/intarfaces/product';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [MainBtnComponent, TranslateModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  wishlist: Wishlist = {} as Wishlist;
  allProducts: Product[] = []
  cancelSubscription: Subscription = new Subscription()
  private readonly _WishListService = inject(WishListService);
  private readonly toastr = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  private readonly _ProductsService = inject(ProductsService);

  ngOnInit(): void {
    this.getLoggedUserWishlist();
    this.getAllProducts();
  }

  getLoggedUserWishlist = () => {
    this._WishListService.getLoggedUserWishlist().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.wishlist = res;
        },
        error: (err) => {
          console.error(err);
        }
      }
    )
  }
  getAllProducts = () => {
    this.cancelSubscription = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  removeProduct(productId: string) {
    this._WishListService.removeProduct(productId).subscribe({
      next: (res) => {
        this.getLoggedUserWishlist();
        this._WishListService.wishlistCounter.next(res.count)
        this.wishlist = res
        this.toastr.success('Deleted successfully', '', {
          progressBar: true,
          timeOut: 1000
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
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
}
