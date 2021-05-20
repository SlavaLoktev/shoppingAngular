import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/Product';
import {
  CategorySearchValues,
  ProductSearchValues,
  ProductSearchValuesWithoutPaging,
  ReviewsSearchValues
} from '../../data/dao/search/SearchObjects';
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
import {ReviewsService} from '../../data/dao/impl/ReviewsService';
import {Reviews} from '../../model/Reviews';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

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

  productSearchValues = new ProductSearchValues();

  categorySearchValues = new CategorySearchValues();

  productSearchValuesWithoutPaging = new ProductSearchValuesWithoutPaging();

  reviewsSearchValues = new ReviewsSearchValues();

  filterTitle = 'женские';

  constructor(private productService: ProductService,
              private dialog: MatDialog,
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
      this.reviews = result;
      console.log('find reviews(): reviewsSearchValues.productId = ' + this.reviewsSearchValues.product);
      console.log('find reviews(): ' + this.reviews);
    });
  }

  ngOnInit(): void {
    this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
  }

  openAddDialog(): void {
    const product = new Product(null, '', '', null, null, '', this.selectedCategory);

    const dialogRef = this.dialog.open(EditProductDialogComponent, {

      data: [product, 'Добавление товара', this.categories, this.attrValues]
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.addProduct.emit(product);
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: [product, 'Редактирование товара', this.categories],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deleteProduct.emit(product);
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.updateProduct.emit(product);
        return;
      }
    });
  }

  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить товар: "${product.productName}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.OK) {
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

      if (!(result)) {
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

      if (!(result)) {
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

      if (!(result)) {
        this.addProductToShoppingCart.emit(product);
        console.log('продукт в productCard ' + product);
        return;
      }
    });
  }
}
