import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/Product';
import {Category} from '../../model/Category';
import {CategorySearchValues, ProductSearchValuesWithoutPaging, ReviewsSearchValues} from '../../data/dao/search/SearchObjects';
import {AttrValue} from '../../model/AttrValue';
import {Reviews} from '../../model/Reviews';
import {ProductService} from '../../data/dao/impl/ProductService';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../data/dao/impl/CategoryService';
import {ReviewsService} from '../../data/dao/impl/ReviewsService';
import {EditProductDialogComponent} from '../../dialog/edit-product-dialog/edit-product-dialog.component';
import {DialogAction} from '../../object/DialogResult';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {ReadProductDialogComponent} from '../../dialog/read-product-dialog/read-product-dialog.component';
import {AddProductDialogComponent} from '../../dialog/add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-kid-product-card',
  templateUrl: './kid-product-card.component.html',
  styleUrls: ['./kid-product-card.component.css']
})
export class KidProductCardComponent implements OnInit {

  @Input('products')
  set setProducts(products: Product[]){
    this.products = products;
  }

  @Input()
  showCRUD: boolean;

  @Input()
  selectedCategory: Category;

  @Output()
  searchAction = new EventEmitter<ProductSearchValuesWithoutPaging>();

  @Output()
  addProduct = new EventEmitter<Product>();

  @Output()
  updateProduct = new EventEmitter<Product>();

  @Output()
  deleteProduct = new EventEmitter<Product>();

  @Output()
  addProductToFavorites = new EventEmitter<Product>();

  @Output()
  addProductToShoppingCart = new EventEmitter<Product>();

  products: Product[];
  categories: Category[];
  attrValues: AttrValue[];
  reviews: Reviews[];

  categorySearchValues = new CategorySearchValues();

  productSearchValuesWithoutPaging = new ProductSearchValuesWithoutPaging();

  reviewsSearchValues = new ReviewsSearchValues();

  filterTitle = 'детские';

  constructor(
      private productService: ProductService,
      private dialog: MatDialog, // работа с диалоговым окном
      private categoryService: CategoryService,
      private reviewsService: ReviewsService
  ) { }

  findProductsWithoutPaging(productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging): void{
    this.productSearchValuesWithoutPaging.productName = this.filterTitle;
    this.productService.findProductsWithoutPaging(this.productSearchValuesWithoutPaging).subscribe(result => {
      this.products = result;
      console.log(result);
    });
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

  ngOnInit(): void {
    this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
  }

  // диалоговое окно для добавления товара
  openAddDialog(): void {
    const product = new Product(null, '', '', null, null, '', this.selectedCategory);

    const dialogRef = this.dialog.open(EditProductDialogComponent, {

      // передаем новый пустой объект  для заполнения
      // также передаем справочные данные (категории, атрибуты)
      data: [product, 'Добавление товара', this.categories, this.attrValues] //             мб добавить поля!!!!!
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }

      if (result.action === DialogAction.SAVE) { // если нажали ОК
        this.addProduct.emit(product);
      }
    });
  }

  // диалоговое окно редактирования для добавления товара
  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: [product, 'Редактирование товара', this.categories],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deleteProduct.emit(product);
        return;
      }

      if (result.action === DialogAction.SAVE) { // если нажали ОК и есть результат
        this.updateProduct.emit(product);
        return;
      }
    });
  }

  // диалоговое окно подтверждения удаления
  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить товар: "${product.productName}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }

      if (result.action === DialogAction.OK) { // если нажали ОК
        this.deleteProduct.emit(product);
      }
    });
  }

  openReadDialog(product: Product): void {
    // this.findReviews(product);
    const dialogRef = this.dialog.open(ReadProductDialogComponent, {
      data: [product, 'Информация о товаре'/*, this.reviews*/],
      autoFocus: false
    });
    // console.log('openReadDialog(): ' + this.reviews);

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
    });
  }

  openAddToFavoritesDialog(product: Product): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: [product, 'Добавлено!'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        this.addProductToFavorites.emit(product);
        console.log('продукт в productCard ' + product);
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
        this.addProductToShoppingCart.emit(product);
        console.log('продукт в productCard ' + product);
        return;
      }
    });
  }

}
