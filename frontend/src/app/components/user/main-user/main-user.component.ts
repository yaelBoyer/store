import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent implements OnInit {

  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.isShowSide$.next(true);
  }

}
