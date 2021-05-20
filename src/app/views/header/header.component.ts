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
      private dialog: MatDialog,
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
  searchCategory = new EventEmitter<CategorySearchValues>();

  @Output()
  selectCategory = new EventEmitter<string>();

  categories: Category[];
  categorySearchValues = new CategorySearchValues();
  filterTitle = 1;

  productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging;

  selectedCategory = '';

  products: Product[];

  search(): void {
    this.categorySearchValues.departmentId = this.filterTitle;
    this.searchCategory.emit(this.categorySearchValues);
  }

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
