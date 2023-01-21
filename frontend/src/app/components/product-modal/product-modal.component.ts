import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {

  constructor(protected dialogRef: NbDialogRef<ProductModalComponent>) {
  }

  cancel() {
    this.dialogRef.close(0);
  }

  submit(count) {
    this.dialogRef.close(count);
  }
}
