import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  baseUrl: string;

  constructor(public httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}cartItems`;
  }

  add(cartItem: CartItem, cartId: string): Observable<CartItem> {
    return this.httpClient.post<CartItem>(`${this.baseUrl}/add/${cartId}`, cartItem).pipe(map((res) => {
      cartItem._id = res._id;
      return cartItem;
    }));
  }

  update(cartItem: CartItem) {
    return this.httpClient.put(`${this.baseUrl}/update/${cartItem._id}`, cartItem);
  }

  delete(cartItem: CartItem, cartId: string) {
    return this.httpClient.put(`${this.baseUrl}/delete/${cartId}`, cartItem);
  }

  deleteAll(cartId: string) {
    return this.httpClient.delete(`${this.baseUrl}/deleteAll/${cartId}`);
  }

}
