import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../model/Product';
import {ReadProductDialogComponent} from '../read-product-dialog/read-product-dialog.component';
import {FillOrderDialogComponent} from '../fill-order-dialog/fill-order-dialog.component';
import {DialogAction} from '../../object/DialogResult';
import {OrdersService} from '../../data/dao/impl/OrdersService';
import {Orders} from '../../model/Orders';

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
      private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
      private ordersService: OrdersService
  ) { }

  newQuantity: number;
  dialogTitle: string; // заголовок окна
  product: Product;
  orders: Orders;
  orderDate = new Date();
  orderTotal: number;

  ngOnInit(): void {
    this.product = this.data[0];
    this.dialogTitle = this.data[1];
    console.log(this.product);
  }

  openFillOrderDialog(product: Product): void{

    if (product.discountPrice === 0 || product.discountPrice === null){
      this.orderTotal = Math.trunc(this.newQuantity) * product.price;
    }else {
      this.orderTotal = Math.trunc(this.newQuantity) * product.discountPrice;
    }

    const orders = new Orders(null, Math.trunc(this.newQuantity), '', '', '', '', '', this.orderDate, this.orderTotal);

    const dialogRef = this.dialog.open(FillOrderDialogComponent, {
      data: [product, 'Заполнение заказа', Math.trunc(this.newQuantity), orders],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }

      if (result.action === DialogAction.SAVE){
        console.log(orders);
        this.ordersService.add(orders).subscribe();
      }
    });
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
