import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../model/Product';
import {Category} from '../../model/Category';
import {AttrValue} from '../../model/AttrValue';

@Component({
  selector: 'app-read-product-dialog',
  templateUrl: './read-product-dialog.component.html',
  styleUrls: ['./read-product-dialog.component.css']
})
export class ReadProductDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<ReadProductDialogComponent>,
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
