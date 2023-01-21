import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('dialog') dialogR;
  order: Order = new Order();
  user: User;
  min: Date;
  datesCatch: Date[] = [];
  messageCreditCard: string = "";

  filterFn = (date:Date) => this.datesCatch.indexOf(date) == -1;

  constructor(public cartService: CartService,
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    protected dateService: NbDateService<Date>,
    public orderService: OrderService,
    private dialogService: NbDialogService) {

    this.min = this.dateService.today();
  }

  ngOnInit(): void {

    this.orderService.getCatchDates().subscribe(res => {
      this.datesCatch = res;
    })

    this.userService.getDetails().subscribe(res => {
      this.user = res;
    })

    var cartId = this.route.snapshot.paramMap.get('cartId')
    if (cartId) {
      this.cartService.getCart().subscribe(res => {
        this.order.cart = res;
        this.order.totalPrice = this.cartService.calcTotalCart(this.order.cart);
      });
    }

  }

  orderCart() {

    if (!this.validateCardNo(this.order.cardNum)) {
      this.messageCreditCard = "Ctredit card erorr";
      return
    }
    this.messageCreditCard = "";
    this.orderService.createOrder(this.order).subscribe(res => {
      this.dialogService.open(this.dialogR);
      this.cartService.cart$.next(null);
    })

  }

  complateCity() {
    this.order.city = this.user.city;
  }

  complateStreet() {
    this.order.street = this.user.street;
  }

  checkLuhn(cardNo) {
    var s = 0;
    var doubleDigit = false;
    for (var i = cardNo.length - 1; i >= 0; i--) {
      var digit = +cardNo[i];
      if (doubleDigit) {
        digit *= 2;
        if (digit > 9)
          digit -= 9;
      }
      s += digit;
      doubleDigit = !doubleDigit;
    }
    return s % 10 == 0;
  }

  validateCardNo(no) {
    return (no && this.checkLuhn(no) &&
      no.length == 16 && (no[0] == 4 || no[0] == 5 && no[1] >= 1 && no[1] <= 5 ||
        (no.indexOf("6011") == 0 || no.indexOf("65") == 0)) ||
      no.length == 15 && (no.indexOf("34") == 0 || no.indexOf("37") == 0) ||
      no.length == 13 && no[0] == 4)
  }

  routeMain() {
    this.router.navigate([""])
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: '' });
  }


  downloadPage() {
    var text: string="";
    this.order.cart.cartItems.forEach(item => {
      text += `name: ${item.product.name} price:${item.product.price} count:${item.count} totalPrice:${item.totalPrice} \n`;
    })
    var file = new Blob([text], { type: '.txt' });
    if (window.navigator["msSaveOrOpenBlob"]) // IE10+
      window.navigator["msSaveOrOpenBlob"](file, "reciept");
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = "reciept";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

}
