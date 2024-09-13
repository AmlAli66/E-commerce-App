import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  wishlistCounter: BehaviorSubject<number> = new BehaviorSubject(0)
  constructor(private _HttpClient: HttpClient) { }
  addToWishList = (productId: string): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/wishlist', { productId })
  }
  removeProduct = (productId: string): Observable<any> => {
    return this._HttpClient.delete(`${baseUrl}api/v1/wishlist/${productId}`)
  }


  getLoggedUserWishlist = (): Observable<any> => {
    return this._HttpClient.get(`${baseUrl}api/v1/wishlist`)
  }


}
