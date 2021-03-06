import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../model/Product';
import {Orders} from '../../model/Orders';
import {OrderDetailsService} from '../../data/dao/impl/OrderDetailsService';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: [Product, string, Orders],
      private dialog: MatDialog,
      private orderDetailsService: OrderDetailsService
  ) { }

  dialogTitle: string;
  product: Product;
  orders: Orders;

  ngOnInit(): void {
    this.product = this.data[0];
    this.dialogTitle = this.data[1];
    this.orders = this.data[2];
  }

}
