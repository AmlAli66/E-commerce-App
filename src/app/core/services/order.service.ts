import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient: HttpClient) { }
  createSession = (cardId: string, shippingAddress: object): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/orders/checkout-session/' + cardId + "?url=http://localhost:49215", { shippingAddress }
    )
  }
}
