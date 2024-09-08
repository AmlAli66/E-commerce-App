import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/intarfaces/product';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { AuthService } from '../../core/services/auth.service';
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategoriesSliderComponent } from "../categories-slider/categories-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainBtnComponent, MainSliderComponent, CategoriesSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  constructor(private _ProductsService: ProductsService, private token: AuthService) {
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
}
