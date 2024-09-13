import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/intarfaces/product';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  allCategories: Category[] = [];
  cancelSubscription: Subscription = new Subscription()
  constructor(private _CategoriesService: CategoriesService) { }
  getCategories = () => {
    this.cancelSubscription = this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      }, error: (error) => {
        console.log(error);
      }
    })
  }
  ngOnInit(): void {
    this.getCategories();
  }
  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }

  // getSubCategory = () => {
  //   this.cancelSubscription = this._CategoriesService.getCategory().subscribe({
  //     next: (res) => {
  //       this.allCategories = res.data;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

}
