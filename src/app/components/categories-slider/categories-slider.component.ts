import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../core/intarfaces/product';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule, TranslateModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss'
})
export class CategoriesSliderComponent implements OnInit {
  categories!: Category[];
  private readonly _CategoriesService = inject(CategoriesService)
  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.categories = res.data;
      }
    }
    )
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rtl: true,
    navSpeed: 700,
    navText: [],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
