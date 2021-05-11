import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {CategoryService} from '../../data/dao/impl/CategoryService';
import {Department} from '../../model/Department';
import {CategorySearchValues, ProductSearchValuesWithoutPaging} from '../../data/dao/search/SearchObjects';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Category[];

  constructor() { }

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Output()
  searchCategory = new EventEmitter<CategorySearchValues>(); // передаем строку для поиска(в <> было string по дефолту)

  @Output()
  selectCategory = new EventEmitter<string>();

  // параметры поиска категорий
  categorySearchValues: CategorySearchValues;

  filterTitle = 1;

  productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging;

  selectedCategory = '';

  // filterProductName = '';

  @Input()
  showCRUD: boolean;

  @Output()
  toggleCRUD = new EventEmitter<boolean>();

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

  ngOnInit(): void {
    // this.categories = this.dataHandler.getCategories();
    // this.dataHandler.categoriesSubject.subscribe(categories => this.categories = categories);
    // this.search();
    // this.searchProductsWithoutPaging(this.filterProductName);
  }

  showProductCardsByCategory(category: Category): void {
    // this.dataHandler.fillProductCardsByCategory(category);
  }
}
