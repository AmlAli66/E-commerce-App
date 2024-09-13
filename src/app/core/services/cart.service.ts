import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCounter: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient) { }


  addProductToCart = (productId: string): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/cart', { productId })
  }


  updateProductQTY = (productId: string, count: number): Observable<any> => {
    return this._HttpClient.put(`${baseUrl}api/v1/cart/${productId}`, { count })
  }


  removeItem = (productId: string): Observable<any> => {
    return this._HttpClient.delete(`${baseUrl}api/v1/cart/${productId}`)
  }


  getLoggedUserCart = (): Observable<any> => {
    return this._HttpClient.get(`${baseUrl}api/v1/cart`)
  }
  clearCart = (): Observable<any> => {
    return this._HttpClient.delete(`${baseUrl}api/v1/cart`)
  }




}
