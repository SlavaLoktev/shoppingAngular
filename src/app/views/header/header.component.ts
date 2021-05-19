import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {CategoryService} from '../../data/dao/impl/CategoryService';
import {CategorySearchValues, ProductSearchValuesWithoutPaging} from '../../data/dao/search/SearchObjects';
import {Product} from '../../model/Product';
import {FavoritesDialogComponent} from '../../dialog/favorites-dialog/favorites-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ShoppingCartDialogComponent} from '../../dialog/shopping-cart-dialog/shopping-cart-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(
      private dialog: MatDialog, // работа с диалоговым окном
      private categoryService: CategoryService
  ) { }

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input()
  showCRUD: boolean;

  @Output()
  toggleCRUD = new EventEmitter<boolean>();

  @Input()
  productToFavorites: Product;

  @Input()
  productToShoppingCart: Product;

  @Output()
  searchCategory = new EventEmitter<CategorySearchValues>(); // передаем строку для поиска(в <> было string по дефолту)

  @Output()
  selectCategory = new EventEmitter<string>();

  categories: Category[];
  // параметры поиска категорий
  // categorySearchValues: CategorySearchValues;
  categorySearchValues = new CategorySearchValues();
  filterTitle = 1;

  productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging;

  selectedCategory = '';

  // filterProductName = '';

  products: Product[];

  // @Input('products')
  // set setProducts(products: Product[]) {
  //   this.products = products;
  // }
  //
  // @Output()
  // searchProduct = new EventEmitter<ProductSearchValuesWithoutPaging>();

  search(): void {
    this.categorySearchValues.departmentId = this.filterTitle;
    this.searchCategory.emit(this.categorySearchValues);
  }

  // searchProductsWithoutPaging(filterProductName: string): void {
  //   this.productSearchValuesWithoutPaging.productName = filterProductName;
  //   this.searchProduct.emit(this.productSearchValuesWithoutPaging);
  // }

  showCategory(category: string): void {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  onToggleCRUD(): void{
    this.toggleCRUD.emit(!this.showCRUD);
  }

  findCategories(categorySearchValues: CategorySearchValues): void{
    this.categorySearchValues = categorySearchValues;
    // this.categorySearchValues.departmentId = 1;
    this.categoryService.findCategories(this.categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  initSearchCategoriesWoman(): void {
    this.categorySearchValues.departmentId = 1;
    this.categoryService.findCategories(this.categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  initSearchCategoriesMan(): void {
    this.categorySearchValues.departmentId = 2;
    this.categoryService.findCategories(this.categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  initSearchCategoriesKids(): void {
    this.categorySearchValues.departmentId = 3;
    this.categoryService.findCategories(this.categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  ngOnInit(): void {
  }

  openFavoritesDialog(product: Product): void {
    const dialogRef = this.dialog.open(FavoritesDialogComponent, {
      data: [product, 'Избранное'],
      autoFocus: false
    });
  }

  openShoppingCartDialog(product: Product): void {
    const dialogRef = this.dialog.open(ShoppingCartDialogComponent, {
      data: [product, 'Корзина'],
      autoFocus: false
    });
  }
}
