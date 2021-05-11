import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ProductDAO} from '../interface/ProductDAO';
import {HttpClient} from '@angular/common/http';
import {CategorySearchValues, ProductSearchValues, ProductSearchValuesWithoutPaging} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {Category} from '../../../model/Category';
import {Product} from '../../../model/Product';
import {CommonService} from './CommonService';
import {CATEGORY_URL_TOKEN} from './CategoryService';

export const PRODUCT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CommonService<Product> implements ProductDAO{

  constructor(@Inject(PRODUCT_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  findProducts(productSearchValues: ProductSearchValues): Observable<Product[]> {
    return this.http.post<Product[]>(this.baseUrl + '/search', productSearchValues);
  }

  findProductsWithoutPaging(productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging): Observable<Product[]> {
    return this.http.post<Product[]>(this.baseUrl + '/searchWithoutPaging', productSearchValuesWithoutPaging);
  }
}
