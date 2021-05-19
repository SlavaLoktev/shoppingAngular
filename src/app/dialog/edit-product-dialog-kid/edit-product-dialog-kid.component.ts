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
      private dialogRef: MatDialogRef<EditProductDialogKidComponent>, // // для возможности работы с текущим диалог. окном
      @Inject(MAT_DIALOG_DATA) private data: [Product, string, Category[], AttrValue[]],
      // данные, которые передаем в текущее диалоговое окно
      private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
      private categoryService: CategoryService
  ) { }

  // коллекции получаем из главной страницы (через параметры диалог. окна), чтобы здесь заново не делать запрос в БД
  categories: Category[];

  dialogTitle: string; // заголовок окна
  product: Product; // товар для редактирования/создания
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

  // старый id категории тоже сохраняем, чтобы иметь возможность знать,
  // какая была до этого категория (нужно для правильного обновления счетчиков) мб не нужно!!!
  oldCategoryId: number;

  canDelete: boolean; // можно ли удалять объект (активна ли кнопка удаления)

  categorySearchValues = new CategorySearchValues();

  findAllCategories(): void {
    this.categoryService.findAll().subscribe(result => {
      this.categories = result;
    });
  }

  findCategories(categorySearchValues: CategorySearchValues): void {
    this.categorySearchValues = categorySearchValues;
    // this.categorySearchValues.departmentId = 1;
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
    // this.findAllCategories();
    // this.findWomanCategories();
    this.product = this.data[0]; // товар для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
    // this.price = this.data[2];  // цена для товара
    // this.storageUnit = this.data[3]; // единицы измерения товара
    this.categories = this.data[2]; // категории для выпадающего списка
    // this.productName = this.data[5];

    console.log(this.product);
    console.log(this.dialogTitle);
    // console.log(this.price);
    // console.log(this.storageUnit);
    // console.log(this.categories);
    // console.log(this.productName);

    // если было передано значение, значит это редактирование (не создание новой товара),
    // поэтому делаем удаление возможным (иначе скрываем иконку)
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
      // this.oldCategoryId = this.product.categories.categoryId; // старое значение категории всегда будет храниться тут
      console.log('this.newCategoryId =' + this.product.categories.categoryId);
    }
  }

  // нажали ОК
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
    // this.product.oldCategory = this.findCategoryById(this.oldCategoryId); // TODO пофиксить категории
    console.log(this.product.categories);
    console.log(this.product);
    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже не задача этого компонента
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.product));
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  // нажали Удалить
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

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }


      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE)); // нажали удалить
      }
    });
  }

  // поиск категории по id
  private findCategoryById(tmpCategoryId: number): Category {
    return this.categories.find(t => t.categoryId === tmpCategoryId);
  }

}
