import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { Role } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  baseUrl = environment.imageUrl;
  role: Role = Role.USER;
  @Output() editProductAdmin: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(public userService: UserService,
    public cartService: CartService,
    private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.userService.role$.subscribe(res => {
      this.role = res;
    })
  }

  open() {
    this.dialogService.open(ProductModalComponent, { context: this.product.name })
      .onClose.subscribe(count => {
        if (count > 0) {
          var cartItem = new CartItem();
          cartItem.count = count;
          cartItem.totalPrice = this.product.price * count;
          cartItem.product = this.product;
          this.cartService.cartItem$.next(cartItem);
        }
      });
  }

  editAdmin() {
    this.editProductAdmin.emit(this.product);
  }

}
