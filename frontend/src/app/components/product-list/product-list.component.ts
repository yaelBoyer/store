import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  @Output() editProductAdmin: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(public productService: ProductService,
    public categoryService: CategoryService,
    private searchService: NbSearchService) {

  }

  ngOnInit(): void {

    this.categoryService.getAllCategory().subscribe(res => {
      this.categories = res;
    })

    this.getAllProducts();

    this.searchService
      .onSearchInput()
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((data: { term: string; tag?: string }) => {
        this.getProductByName(data.term);
      });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
    })
  }

  getProductsByCategory(category: string) {

    this.productService.getProductByCategory(category).subscribe(res => {
      this.products = res;
    })
  }

  getProductByName(name: string) {
    this.productService.getProductByName(name).subscribe(res => {
      this.products = res;
    })
  }

  editAdmin(product: Product) {
    this.editProductAdmin.emit(product);
  }

}
