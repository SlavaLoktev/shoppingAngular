import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/Product';
import {ProductSearchValuesWithoutPaging} from '../../data/dao/search/SearchObjects';
import {ProductService} from '../../data/dao/impl/ProductService';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-man-catalog',
  templateUrl: './man-catalog.component.html',
  styleUrls: ['./man-catalog.component.css']
})
export class ManCatalogComponent implements OnInit {

  products: Product[];

  productSearchValuesWithoutPaging = new ProductSearchValuesWithoutPaging();

  showCRUD: boolean;

  selectedCategory = '';

  filterTitle = '';

  constructor(
      private productService: ProductService,
      private dialog: MatDialog
  ) { }

  toggleCRUD(showCRUD: boolean): void {
    this.showCRUD = showCRUD;
    console.log(this.showCRUD);
  }

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

    this.productSearchValuesWithoutPaging.productName = this.filterTitle + ' мужские';
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
  }

  addProduct(product: Product): void {
    this.productService.add(product).subscribe(result => {
      this.initSearchAfterCRUD();
    });
  }

  updateProduct(product: Product): void {
    this.productService.update(product).subscribe(result => {
      this.initSearchAfterCRUD();
    });
  }

  deleteProduct(product: Product): void {
    this.productService.delete(product.productId).subscribe(result => {
      this.initSearchAfterCRUD();
    });
  }

  // addProductToFavorites(product: Product): void {
  //   this.addProductToFavoritesFromWoman = product;
  // }

}
