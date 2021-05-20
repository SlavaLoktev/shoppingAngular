import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../model/Product';
import {Orders} from '../../model/Orders';
import {formatDate} from '@angular/common';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {OrdersService} from '../../data/dao/impl/OrdersService';
import {OrderDetails} from '../../model/OrderDetails';
import {OrderDetailsService} from '../../data/dao/impl/OrderDetailsService';
import {OrderDetailsDialogComponent} from '../order-details-dialog/order-details-dialog.component';


@Component({
  selector: 'app-fill-order-dialog',
  templateUrl: './fill-order-dialog.component.html',
  styleUrls: ['./fill-order-dialog.component.css']
})
export class FillOrderDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<FillOrderDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: [Product, string, number, Orders],
      private dialog: MatDialog,
      private ordersService: OrdersService,
      private orderDetailsService: OrderDetailsService
  ) { }

  product: Product;
  orders: Orders;
  dialogTitle: string;
  quantity: number;
  currentDate = new Date();
  orderDate: string;

  newCustomerFirstName: string;
  newCustomerLastName: string;
  newCustomerAddress: string;
  newCustomerEmail: string;
  newCustomerPhone: string;

  ngOnInit(): void {
    this.product = this.data[0];
    this.dialogTitle = this.data[1];
    this.quantity = this.data[2];
    this.orders = this.data[3];
    console.log(this.product);
    console.log(this.quantity);
    console.log(this.orders);

    this.orderDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US').toString();
    console.log(this.orderDate);

    this.newCustomerFirstName = this.orders.customerFirstName;
    this.newCustomerLastName = this.orders.customerLastName;
    this.newCustomerAddress = this.orders.customerAddress;
    this.newCustomerEmail = this.orders.customerEmail;
    this.newCustomerPhone = this.orders.customerPhone;
    this.quantity = this.orders.quantity;
  }

  openFillOrderDetailsDialog(product: Product, orders: Orders): void{

    const orderDetails = new OrderDetails(null, this.quantity, orders, product);

    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      data: [product, 'Ваш заказ: ', orders],
      autoFocus: false
    });

    dialogRef.afterOpened().subscribe(result => {
      console.log(orderDetails);
      this.orderDetailsService.add(orderDetails).subscribe();
    });
  }

  confirm(): void {
    this.orders.customerFirstName = this.newCustomerFirstName;
    this.orders.customerLastName = this.newCustomerLastName;
    this.orders.customerAddress = this.newCustomerAddress;
    this.orders.customerEmail = this.newCustomerEmail;
    this.orders.customerPhone = this.newCustomerPhone;
    this.orders.quantity = this.quantity;
    console.log(this.orders);
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.orders));

  }

  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
