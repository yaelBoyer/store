import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth';
import { Role } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;
  showLogin = true;
  isHasCart: boolean = false;

  constructor(
    protected cd: ChangeDetectorRef,
    protected router: Router,
    public sessionService: SessionService,
    public tokenService: TokenService,
    public cartService: CartService,
    public userService: UserService) {
  }
  ngOnInit(): void {
    this.tokenService.token$.subscribe(res => {
      if (res)
        this.showLogin = false;
      else this.showLogin = true;
    })

    this.cartService.cart$.subscribe(res => {
      if (res) {
        this.isHasCart = true;
      }
      else {
        this.isHasCart = false;
      }
    })
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.sessionService.authenticate(this.user).subscribe((result: any) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      var redirect = result.getRedirect();
      this.userService.getDetails().subscribe(res => {
        if (res.role == Role.ADMIN)
          redirect = "admin"
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, 10);
        }
      })

      this.cd.detectChanges();
    });
  }

  startShopping() {
    this.cartService.createCart().subscribe(res => {
      this.router.navigate(["user"]);
    })
  }

  resumeShopping() {
    this.router.navigate(["user"])
  }
}
