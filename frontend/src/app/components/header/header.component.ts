import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs';
import { Role, User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  user: User;
  isShowSide: boolean = false;
  userMenu = [{ title: 'Log out' }];


  constructor(public tokenService: TokenService,
    public userService: UserService,
    private sidebarService: NbSidebarService,
    public productService: ProductService,
    private nbMenuService: NbMenuService,
    public sessionService: SessionService,
    public router: Router) {
  }

  ngAfterViewInit(): void {

  }

  toggle() {
    this.sidebarService.toggle(false, 'admin');
  }

  toggleAll() {
    if (this.user.role == Role.USER)
      this.sidebarService.toggle(false, 'user');
    else this.sidebarService.toggle(false, 'admin');
  }

  ngOnInit(): void {
    this.tokenService.token$.subscribe(res => {
      if (res) {
        this.userService.getDetails().subscribe(res => {
          this.user = res;
          if (this.user.role == Role.ADMIN) {
            this.userMenu.push({ title: 'Admin' });
          }
        })
      }
      else this.user = null;
    })

    this.productService.isShowSide$.subscribe(res => {
      this.isShowSide = res;
    })

    setTimeout(() => {
      this.toggle();
    }, 1);

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == 'Log out') {
          this.sessionService.logout();
          this.router.navigate(['']);
        }
        else {
          this.router.navigate(['admin']);

        }
      });
  }
}
