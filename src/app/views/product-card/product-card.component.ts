import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/Product';
import {CategorySearchValues, ProductSearchValues, ProductSearchValuesWithoutPaging} from '../../data/dao/search/SearchObjects';
import {ProductService} from '../../data/dao/impl/ProductService';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {EditProductDialogComponent} from '../../dialog/edit-product-dialog/edit-product-dialog.component';
import {AttrValue} from '../../model/AttrValue';
import {DialogAction} from '../../object/DialogResult';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {CategoryService} from '../../data/dao/impl/CategoryService';
import {ReadProductDialogComponent} from '../../dialog/read-product-dialog/read-product-dialog.component';
import {AddProductDialogComponent} from '../../dialog/add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  productCards: Product[];

  @Input('products')
  set setProducts(products: Product[]){
    this.products = products;
  }

  @Input()
  showCRUD: boolean;

  // @Input('selectedCategory')
  // set setCategory(category: string){
  //   this.
  // }

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

  products: Product[];
  categories: Category[];
  attrValues: AttrValue[];

  productSearchValues = new ProductSearchValues();

  categorySearchValues = new CategorySearchValues();

  productSearchValuesWithoutPaging = new ProductSearchValuesWithoutPaging();

  filterTitle = 'женские';
  // filterTitle1 = 'сумка';

  constructor(private productService: ProductService,
              private dialog: MatDialog, // работа с диалоговым окном
              private categoryService: CategoryService
  ) { }

  // searchProducts(productSearchValues: ProductSearchValues): void {
  //   this.productSearchValues = productSearchValues;
  //
  //   this.productService.findProducts(this.productSearchValues).subscribe(result => {
  //     this.products = result;
  //     console.log(result);
  //   });
  // }

  // findProductsAll(): void{
  //   this.productService.findAll().subscribe(result => {
  //     this.products = result;
  //   });
  // }


  findProductsWithoutPaging(productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging): void{
    this.productSearchValuesWithoutPaging.productName = this.filterTitle;
    this.productService.findProductsWithoutPaging(this.productSearchValuesWithoutPaging).subscribe(result => {
      this.products = result;
      console.log(result);
    });
  }

  // findProductsWithoutPaging1(productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging): void{
  //   this.productSearchValuesWithoutPaging.productName = this.filterTitle1;
  //   this.productService.findProductsWithoutPaging(this.productSearchValuesWithoutPaging).subscribe(result => {
  //     this.products = result;
  //     console.log(result);
  //   });
  // }

  ngOnInit(): void {
    // this.dataHandler.productsSubject.subscribe(productCards => this.productCards = productCards);
    // this.searchProducts(this.productSearchValues);
    // this.findProductsAll();
    this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
  }

  // диалоговое окно для добавления задачи
  openAddDialog(): void {
    const product = new Product(null, '', '', null, null, '', this.selectedCategory);

    const dialogRef = this.dialog.open(EditProductDialogComponent, {

      // передаем новый пустой объект  для заполнения
      // также передаем справочные данные (категории, приоритеты)
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
        return;
      }
    });
  }
}
