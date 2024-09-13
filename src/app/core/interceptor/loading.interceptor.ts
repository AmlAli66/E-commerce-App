import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let spinner = inject(NgxSpinnerService)
  if (req.url.includes('cart') || req.url.includes('wishlist')) {
    spinner.show('jelly-box-spinner')
  } else {
    spinner.show('ball-spinner')
  }
  return next(req).pipe(finalize(() => {
    if (req.url.includes('cart') || req.url.includes('wishlist')) {
      spinner.hide('jelly-box-spinner')
    } else {
      spinner.hide('ball-spinner')
    }
  }));
};
