import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../intarfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string) {
    return products.filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

}
