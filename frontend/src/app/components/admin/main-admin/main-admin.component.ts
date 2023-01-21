import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbSidebarState } from '@nebular/theme';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  product: Product;

  constructor(private sidebarService: NbSidebarService,
    public productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.isShowSide$.next(true);
  }

  toggle() {
    this.sidebarService.toggle(false, 'admin');
  }

  editAdmin(product: Product) {
    this.sidebarService.getSidebarState("admin").subscribe((r: NbSidebarState) => {
      if (r == "collapsed")
        this.sidebarService.toggle(false, 'admin');
    })
    this.product = product;
  }
}
