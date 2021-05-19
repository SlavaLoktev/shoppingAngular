import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../model/Product';
import {AddProductDialogComponent} from '../add-product-dialog/add-product-dialog.component';
import {Reviews} from '../../model/Reviews';
import {ReviewsSearchValues} from '../../data/dao/search/SearchObjects';
import {ReviewsService} from '../../data/dao/impl/ReviewsService';

@Component({
  selector: 'app-read-product-dialog',
  templateUrl: './read-product-dialog.component.html',
  styleUrls: ['./read-product-dialog.component.css']
})
export class ReadProductDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<ReadProductDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: [Product, string/*, Reviews[]*/],
      // данные, которые передаем в текущее диалоговое окно
      private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
      private reviewsService: ReviewsService
  ) { }

  dialogTitle: string; // заголовок окна
  product: Product;
  reviews: Reviews[];

  reviewsSearchValues = new ReviewsSearchValues();

  ngOnInit(): void {
    this.product = this.data[0];
    this.dialogTitle = this.data[1];
    this.findReviews(this.product);
    // this.reviews = this.data[2];
    console.log(this.reviews);
  }

  findReviews(product: Product): void{
    console.log('find reviews(): product.id = ' + product.productId);
    this.reviewsSearchValues.product = product.productId;
    this.reviewsService.findReviews(this.reviewsSearchValues).subscribe(result => {
      // for (const review of this.reviews){
      //   if (product.productId === review.productId.productId){
      //     this.reviews = result;
      //   }
      // }
      this.reviews = result;
      console.log('find reviews(): reviewsSearchValues.productId = ' + this.reviewsSearchValues.product);
      console.log('find reviews(): ' + this.reviews);
    });
  }

  openAddToFavoritesDialog(product: Product): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: [product, 'Добавлено!'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
    });
  }

  openAddToShoppingCartDialog(product: Product): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: [product, 'Добавлено!'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
    });
  }

}
