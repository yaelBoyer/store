import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of as observableOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string;

  constructor(public httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}orders`;
  }

  countOrder(): Observable<number> {
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

  getCatchDates(): Observable<Date[]> {
    return this.httpClient.get(`${this.baseUrl}/getAllCatchOrders`)
      .pipe(
        map((res: any[]) => {
          if (res) {
            var listDates: Date[] = [];
            res.forEach(r => {
              listDates.push(new Date(r._id));
            })
            return listDates;
          }
          else return []
        }),
        catchError((res) => {
          return observableOf([]);
        }),
      )
  }

  getLastUserOrder(): Observable<Order> {
    return this.httpClient.get<Order>(`${this.baseUrl}/lastOrder`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.baseUrl}/create`, order);
  }
}
