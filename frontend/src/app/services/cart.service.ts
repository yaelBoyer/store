import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string;
  public cart$: BehaviorSubject<Cart> = new BehaviorSubject(null);
  public cartItem$: BehaviorSubject<CartItem> = new BehaviorSubject(null);


  constructor(public httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}carts`;
  }

  getCart(): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.baseUrl}`).pipe(
      map((res) => {
        this.cart$.next(res);
        return res;
      }),
    );;
  }

  createCart(): Observable<Cart> {
    return this.httpClient.post<Cart>(`${this.baseUrl}`, new Cart()).pipe(
      map((res) => {
        this.cart$.next(res);
        return res;
      }),
    );;
  }

  calcTotalCart(cart: Cart) {
    var total = 0;
    cart?.cartItems?.forEach(item => {
      total += item.totalPrice;
    })
    return total;
  }
}
