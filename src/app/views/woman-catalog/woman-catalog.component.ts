import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../data/dao/impl/ProductService';
import {ProductSearchValues, ProductSearchValuesWithoutPaging} from '../../data/dao/search/SearchObjects';
import {Product} from '../../model/Product';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-woman-catalog',
  templateUrl: './woman-catalog.component.html',
  styleUrls: ['./woman-catalog.component.css']
})
export class WomanCatalogComponent implements OnInit {

  products: Product[];

  productSearchValues = new ProductSearchValues();

  selectedCategory = '';

  productSearchValuesWithoutPaging = new ProductSearchValuesWithoutPaging();

  // значение для поиска
  // filterTitle: string;
  filterTitle = '';

  showCRUD: boolean;

  // @Output()
  // searchAction = new EventEmitter<ProductSearchValuesWithoutPaging>();

  addProductToFavoritesFromWoman: Product;

  addProductToShoppingCartFromWoman: Product;

  constructor(private productService: ProductService,
              private dialog: MatDialog) { }

  // searchProducts(productSearchValues: ProductSearchValues): void {
  //   this.productSearchValues = productSearchValues;
  //
  //   this.productService.findProducts(this.productSearchValues).subscribe(result => {
  //     this.products = result;
  //     console.log(result);
  //   });
  // }

  selectCategory(category: string): void{
    this.selectedCategory = category;
    this.productSearchValuesWithoutPaging.productName = category;
    this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
  }

  findProductsWithoutPaging(productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging): void{
    this.productSearchValuesWithoutPaging = productSearchValuesWithoutPaging;

    this.productService.findProductsWithoutPaging(this.productSearchValuesWithoutPaging).subscribe(result => {
      this.products = result;
      console.log(result);
    });
  }

  toggleCRUD(showCRUD: boolean): void {
    this.showCRUD = showCRUD;
    console.log(this.showCRUD);
  }

  initSearch(): void{

    this.productSearchValuesWithoutPaging.productName = this.filterTitle;
    console.log(this.productSearchValuesWithoutPaging.productName);
    // this.searchAction.emit(this.productSearchValuesWithoutPaging);
    // this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
    this.productService.findProductsWithoutPaging(this.productSearchValuesWithoutPaging).subscribe(result => {
      this.products = result;
      console.log(result);
    });
  }

  initSearchAfterCRUD(): void{

    this.productSearchValuesWithoutPaging.productName = this.filterTitle + ' женские';
    console.log(this.productSearchValuesWithoutPaging.productName);
    // this.searchAction.emit(this.productSearchValuesWithoutPaging);
    // this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
    this.productService.findProductsWithoutPaging(this.productSearchValuesWithoutPaging).subscribe(result => {
      this.products = result;
      console.log(result);
    });
  }

  leftbar(): void{
    const coll = document.getElementsByClassName('collapsible');
    let i;

    for (i = 0; i < coll.length; i++) {
      // tslint:disable-next-line:typedef
      coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  }

  ngOnInit(): void {
    this.leftbar();
    // this.searchProducts(this.productSearchValues);
  }

  addProduct(product: Product): void {
    this.productService.add(product).subscribe(result => {
      // this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging); // обновляем список товаров
      this.initSearchAfterCRUD();
    });
  }

  updateProduct(product: Product): void {
    this.productService.update(product).subscribe(result => {
      // this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
      this.initSearchAfterCRUD();
    });
  }

  deleteProduct(product: Product): void {
    this.productService.delete(product.productId).subscribe(result => {
      // this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
      this.initSearchAfterCRUD();
    });
  }

  addProductToFavorites(product: Product): void {
    this.addProductToFavoritesFromWoman = product;
  }

  addProductToShoppingCart(product: Product): void{
    this.addProductToShoppingCartFromWoman = product;
  }

}
