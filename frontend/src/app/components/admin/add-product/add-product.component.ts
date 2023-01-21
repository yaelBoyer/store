import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  title = 'angular-image-file-upload-tutorial';

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  categories: Category[] = [];
  @Input() product: Product = new Product();

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public categoryService: CategoryService,
    public productService: ProductService,
    private toastrService: NbToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });

    this.categoryService.getAllCategory().subscribe(res => {
      this.categories = res;
    })

  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }


  onFormSubmit() {

    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('image', this.fileUploadForm.get('uploadedImage').value);
    formData.append('category', this.product.category);
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());

    if (this.product._id) {
      this.productService.editProduct(formData, this.product._id).subscribe(res => {
        setTimeout(() => {
          this.router.navigate([""]);
        }, 10);
        this.showToast("checkmark-circle-outline", "Success", "Edit product success");
      })
    }

    else {
      this.productService.addProduct(formData).subscribe(res => {
        setTimeout(() => {
          this.router.navigate([""]);
        }, 10);
        this.showToast("checkmark-circle-outline", "Success", "Add product success");
      })
    }
    return true;
  }

  addNew() {
    this.product = new Product();
  }

  showToast(iconName, title, message) {
    const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva' };
    this.toastrService.show(message, title, { icon: iconConfig, status: 'success' });
  }
}
