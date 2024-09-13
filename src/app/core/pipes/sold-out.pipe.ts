import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soldOut',
  standalone: true
})
export class SoldOutPipe implements PipeTransform {

  transform(qty: number, limit = 100): null | string {
    if (qty > limit) {
      return null;
    } else {
      return `sold out`;
      // return `only ${qty}in the stock`;
    }
  }

}
