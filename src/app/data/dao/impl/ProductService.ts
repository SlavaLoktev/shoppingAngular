import { Injectable } from '@angular/core';
import {ProductDAO} from '../interface/ProductDAO';
import {HttpClient} from '@angular/common/http';
import {CategorySearchValues, ProductSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {Category} from '../../../model/Category';
import {Product} from '../../../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements ProductDAO{

  url = 'http://localhost:8080/product';

  constructor(private httpClient: HttpClient) { }

  findProducts(productSearchValues: ProductSearchValues): Observable<Product[]> {
    return this.httpClient.post<Product[]>(this.url + '/search', productSearchValues);
  }

  add(t: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url + '/add', t);
  }

  delete(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + '/id/' + id);
  }

  findAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + '/all');
  }

  update(t: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.url + '/update', t);
  }
}
