import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<AddProductDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: [Product, string],
      // данные, которые передаем в текущее диалоговое окно
      private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) { }

  dialogTitle: string; // заголовок окна
  product: Product;

  ngOnInit(): void {
    this.product = this.data[0];
    this.dialogTitle = this.data[1];
  }

}