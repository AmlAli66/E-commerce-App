import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _HttpClient: HttpClient) { }
  getCategories = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/categories')
  }

  getCategory = (id: string): Observable<any> => {
    return this._HttpClient.get(baseUrl + `api/v1/subcategories/${id}`)
  }
}
