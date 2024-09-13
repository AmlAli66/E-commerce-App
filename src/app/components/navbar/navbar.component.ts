import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { myTranslationService } from '../../core/services/translation.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  counter: number = 0;
  private readonly _myTranslationService = inject(myTranslationService);
  private readonly _CartService = inject(CartService)
  readonly _TranslateService = inject(TranslateService);
  constructor(private _AuthService: AuthService) { }
  logout() {
    this._AuthService.logout();
  }

  ngOnInit(): void {
    this._myTranslationService.changeDirection()
    this._CartService.cartCounter.subscribe({
      next: (counter) => {
        this.counter = counter
      }
    })
    this.getLoggedUserCart()
  }

  getLoggedUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe(
      {
        next: (res) => {
          this._CartService.cartCounter.next(res.numOfCartItems)

        },
        error: (err) => {
          console.error(err);
        }
      }
    )
  }

  selectLang(lang: string) {
    this._myTranslationService.changeLang(lang)
  }
}
