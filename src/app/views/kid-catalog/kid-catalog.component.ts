import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/Product';
import {ProductSearchValuesWithoutPaging} from '../../data/dao/search/SearchObjects';
import {ProductService} from '../../data/dao/impl/ProductService';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-kid-catalog',
  templateUrl: './kid-catalog.component.html',
  styleUrls: ['./kid-catalog.component.css']
})
export class KidCatalogComponent implements OnInit {

  products: Product[];

  productSearchValuesWithoutPaging = new ProductSearchValuesWithoutPaging();

  showCRUD: boolean;

  selectedCategory = null;

  selectedDepartment = null;

  filterTitle = '';

  addProductToFavoritesFromKid: Product;

  addProductToShoppingCartFromKid: Product;

  constructor(
      private productService: ProductService,
      private dialog: MatDialog
  ) { }

  toggleCRUD(showCRUD: boolean): void {
    this.showCRUD = showCRUD;
    console.log(this.showCRUD);
  }

  selectCategory(category?: number): void {
    this.selectedCategory = category;
    this.productSearchValuesWithoutPaging.categoryId = category;
    this.findProductsWithoutPaging(this.productSearchValuesWithoutPaging);
  }

  selectDepartment(department?: number): void{
    this.selectedDepartment = department;
    this.productSearchValuesWithoutPaging.departmentId = department;
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
    this.productSearchValuesWithoutPaging.departmentId = 3;
    console.log(this.productSearchValuesWithoutPaging.productName);
    this.productService.findProductsWithoutPaging(this.productSearchValuesWithoutPaging).subscribe(result => {
      this.products = result;
      console.log(result);
    });
  }

  initSearchAfterCRUD(): void{
    this.productSearchValuesWithoutPaging.departmentId = 3;
    console.log(this.productSearchValuesWithoutPaging.productName);
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
    this.selectDepartment(3);
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

  addProductToFavorites(product: Product): void {
    this.addProductToFavoritesFromKid = product;
  }

  addProductToShoppingCart(product: Product): void{
    this.addProductToShoppingCartFromKid = product;
  }

}
