import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../model/Product';
import {Category} from '../../model/Category';
import {AttrValue} from '../../model/AttrValue';
import {CategoryService} from '../../data/dao/impl/CategoryService';
import {CategorySearchValues} from '../../data/dao/search/SearchObjects';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-product-dialog-kid',
  templateUrl: './edit-product-dialog-kid.component.html',
  styleUrls: ['./edit-product-dialog-kid.component.css']
})
export class EditProductDialogKidComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<EditProductDialogKidComponent>,
      @Inject(MAT_DIALOG_DATA) private data: [Product, string, Category[], AttrValue[]],
      private dialog: MatDialog,
      private categoryService: CategoryService
  ) { }

  categories: Category[];

  dialogTitle: string;
  product: Product;
  price: number;
  storageUnit: string;
  productName: string;

  // сохраняем все значения в отдельные переменные,
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  newProductName: string;
  newPrice: number;
  newStorageUnit: string;
  newDiscountPrice: number;
  newDescription: string;
  newCategoryId: number;
  newImage: string;
  newNewLabel: boolean;

  oldCategoryId: number;

  canDelete: boolean;

  categorySearchValues = new CategorySearchValues();

  findAllCategories(): void {
    this.categoryService.findAll().subscribe(result => {
      this.categories = result;
    });
  }

  findCategories(categorySearchValues: CategorySearchValues): void {
    this.categorySearchValues = categorySearchValues;
    this.categoryService.findCategories(this.categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  initSearchCategories(): void {
    this.categorySearchValues.departmentId = 3;
    this.categoryService.findCategories(this.categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  ngOnInit(): void {

    this.initSearchCategories();
    this.product = this.data[0];
    this.dialogTitle = this.data[1];
    this.categories = this.data[2];

    console.log(this.product);
    console.log(this.dialogTitle);

    if (this.product && this.product.productId > 0) {
      this.canDelete = true;
    }

    // инициализация начальных значений (записывам в отдельные переменные
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
    this.newProductName = this.product.productName;
    this.newPrice = this.product.price;
    this.newStorageUnit = this.product.storageUnit;
    this.newDiscountPrice = this.product.discountPrice;
    this.newDescription = this.product.description;
    this.newImage = this.product.image;
    this.newNewLabel = this.product.newLabel;

    // чтобы в html странице корректно работали выпадающие списки - лучше работать не с объектами, а с их id
    if (this.product.categories) {
      this.newCategoryId = this.product.categories.categoryId;
      console.log('this.newCategoryId =' + this.product.categories.categoryId);
    }
  }

  confirm(): void {
    this.product.productName = this.newProductName;
    console.log(this.product.productName);
    this.product.price = this.newPrice;
    this.product.storageUnit = this.newStorageUnit;
    this.product.discountPrice = this.newDiscountPrice;
    this.product.description = this.newDescription;
    this.product.image = this.newImage;
    this.product.categories = this.findCategoryById(this.newCategoryId);
    this.product.newLabel = this.newNewLabel;
    console.log(this.product.categories);
    console.log(this.product);
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.product));
  }

  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить товар: "${this.product.productName}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }


      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });
  }

  private findCategoryById(tmpCategoryId: number): Category {
    return this.categories.find(t => t.categoryId === tmpCategoryId);
  }

}
