import { Injectable } from '@angular/core';
import {Product} from '../model/Product';
import {TestData} from '../data/TestData';
import {Category} from '../model/Category';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  productsSubject = new BehaviorSubject<Product[]>(TestData.products);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() {
    this.fillProductCards();
  }

  // getCategories(): Category[] {
  //   return TestData.categories;
  // }

  fillProductCards(): void {
    this.productsSubject.next(TestData.products);
  }

  fillProductCardsByCategory(category: Category): void {
    const products = TestData.products.filter(product => product.category === category);
    this.productsSubject.next(products);
  }
}
