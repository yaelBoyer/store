import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of as observableOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string;
  public isShowSide$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}products`;
  }

  countProduct(): Observable<number> {
    return this.httpClient.get(`${this.baseUrl}/count`)
      .pipe(
        map((res) => {
          return Number(res['count'])
        }),
        catchError((res) => {
          return observableOf(0);
        }),
      )
  }

  addProduct(form: any) {
    return this.httpClient.post(`${this.baseUrl}/create`, form);
  }

  editProduct(form: any, id: string) {
    return this.httpClient.put(`${this.baseUrl}/${id}`, form);
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}`);
  }

  getProductByCategory(categoryId: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/byCategory/${categoryId}`)
  }

  getProductByName(name: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/byName/${name}`)
  }
}
