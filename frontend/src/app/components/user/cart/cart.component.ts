import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSortDirection, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { CartItemService } from 'src/app/services/cart-item.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';


interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
  childEntries?: FSEntry[];
  expanded?: boolean;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() isAllowChanges: boolean = true;
  cart: Cart;
  totalPrice: number;
  colums = ['', 'name', 'count', 'price', 'total'];
  baseUrl = environment.imageUrl;
  cartItem: CartItem;
  searchName: string;

  constructor(public cartService: CartService,
    public cartItemService: CartItemService,
    public router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    var cartId = this.route.snapshot.paramMap.get('cartId')
    if (cartId) {
      this.cartService.getCart().subscribe(res => {
        this.cart = res;
      });
    }

    if (this.isAllowChanges)
      this.colums.push('Action')

    this.cartService.cart$.subscribe(res => {
      this.cart = res;
      this.totalPrice = this.cartService.calcTotalCart(this.cart);
    })

    this.cartService.cartItem$.subscribe(res => {
      if (res) {
        this.cartItem = res;
        var itemFind = this.cart.cartItems.find(p => p.product._id == res.product._id);
        if (itemFind) {
          itemFind.count = (res.count);
          itemFind.totalPrice = res.totalPrice;
          if (itemFind._id)
            this.cartItemService.update(itemFind).subscribe(item => {
            })
        }
        else {
          this.cart.cartItems.push(res);
          this.cartItemService.add(res, this.cart._id).subscribe(item => {
            this.cart.cartItems[this.cart.cartItems.length - 1]._id = item._id;
          });
        }
        this.totalPrice = this.cartService.calcTotalCart(this.cart);
      }
    })
  }

  removeItem(cartItem: CartItem) {
    this.cartItemService.delete(cartItem, this.cart._id).subscribe(item => {
      const index = this.cart.cartItems.indexOf(cartItem, 0);
      if (index > -1) {
        this.cart.cartItems.splice(index, 1);
        this.totalPrice = this.cartService.calcTotalCart(this.cart);
      }
    });
  }

  removeAllItems() {
    this.cartItemService.deleteAll(this.cart._id).subscribe(item => {
      this.cart.cartItems = [];
      this.totalPrice = this.cartService.calcTotalCart(this.cart);
    });
  }

  order() {
    this.router.navigate(['user/order', this.cart._id])
  }

  backToShop() {
    this.router.navigate(['user'])
  }

}
