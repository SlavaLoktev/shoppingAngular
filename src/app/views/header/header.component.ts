import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {CategoryService} from '../../data/dao/impl/CategoryService';
import {CategorySearchValues, ProductSearchValuesWithoutPaging} from '../../data/dao/search/SearchObjects';
import {Product} from '../../model/Product';
import {FavoritesDialogComponent} from '../../dialog/favorites-dialog/favorites-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ShoppingCartDialogComponent} from '../../dialog/shopping-cart-dialog/shopping-cart-dialog.component';
import {DepartmentService} from '../../data/dao/impl/DepartmentService';
import {Department} from '../../model/Department';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
      private dialog: MatDialog,
      private categoryService: CategoryService,
      private departmentService: DepartmentService
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
  selectCategory = new EventEmitter<number>();

  @Output()
  selectDepartment = new EventEmitter<number>();

  categories: Category[];
  categorySearchValues = new CategorySearchValues();
  filterTitle = 1;

  productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging;

  selectedCategory = null;

  selectedDepartment = null;

  products: Product[];

  departments: Department[];

  searchDepartments(): void{
    this.departmentService.findAll().subscribe(result => {
      this.departments = result;
    });
  }

  search(): void {
    this.categorySearchValues.departmentId = this.filterTitle;
    this.searchCategory.emit(this.categorySearchValues);
  }

  showDepartment(department?: number): void{
    this.selectedDepartment = department;
    this.selectDepartment.emit(this.selectedDepartment);
  }

  showCategory(category: number): void {
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

  initSearchCategories(departmentId: number): void {
    this.categorySearchValues.departmentId = departmentId;
    this.categoryService.findCategories(this.categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  ngOnInit(): void {
    this.searchDepartments();
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
