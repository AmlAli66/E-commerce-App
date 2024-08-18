import { Component, OnInit } from '@angular/core';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/intarfaces/product';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MainBtnComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  constructor(private _ProductsService: ProductsService) { }
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
