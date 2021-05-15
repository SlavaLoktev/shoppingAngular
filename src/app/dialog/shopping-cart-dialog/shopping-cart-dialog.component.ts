import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../model/Product';
import {ReadProductDialogComponent} from '../read-product-dialog/read-product-dialog.component';

@Component({
  selector: 'app-shopping-cart-dialog',
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.css']
})
export class ShoppingCartDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<ShoppingCartDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: [Product, string],
      // данные, которые передаем в текущее диалоговое окно
      private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) { }

  dialogTitle: string; // заголовок окна
  product: Product;

  ngOnInit(): void {
    this.product = this.data[0];
    this.dialogTitle = this.data[1];
    console.log(this.product);
  }

  openReadDialog(product: Product): void {
    const dialogRef = this.dialog.open(ReadProductDialogComponent, {
      data: [product, 'Информация о товаре'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
    });
  }

}
