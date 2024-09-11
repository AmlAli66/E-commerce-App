import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/intarfaces/cart';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MainBtnComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart: Cart = {} as Cart;
  isLoading: boolean = true;
  private readonly _CartService = inject(CartService);
  private readonly toastr = inject(ToastrService)


  getLoggedUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.cart = res;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      }
    )
  }

  ngOnInit(): void {
    this.getLoggedUserCart()

  }

  deleteItem(productId: string) {
    this._CartService.removeItem(productId).subscribe({
      next: (res) => {
        // this.getLoggedUserCart();
        this.cart = res
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

  updateQTY(productId: string, count: number) {
    this._CartService.updateProductQTY(productId, count).subscribe({
      next: (res) => {
        // this.getLoggedUserCart();
        this.cart = res;
        this.toastr.success('Cart Updated successfully', '', {
          progressBar: true,
          timeOut: 1000
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
