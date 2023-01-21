import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countProduct: number;
  countOrders: number;
  cart: Cart;
  isLogin: boolean = false;
  order: Order;

  constructor(public orderService: OrderService,
    public productService: ProductService,
    public cartService: CartService,
    public tokenService: TokenService) {

  }

  ngOnInit(): void {
    this.orderService.countOrder().subscribe(num => {
      this.countOrders = num
    })

    this.productService.countProduct().subscribe(num => {
      this.countProduct = num
    })

    this.cartService.cart$.subscribe(res => {
      this.cart = res;
    })

    this.tokenService.token$.subscribe(res => {
      if (res) {
        this.isLogin = true;
        this.cartService.getCart().subscribe(res => {
          this.cart = res;
          if (!res) {
            this.orderService.getLastUserOrder().subscribe(res => {
              this.order = res;
            })
          }
        });
      }
      else {
        this.isLogin = false;
      }
    })
  }

}
