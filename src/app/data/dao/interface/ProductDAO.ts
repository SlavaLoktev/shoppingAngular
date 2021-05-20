import {CommonDAO} from './CommonDAO';
import {Product} from '../../../model/Product';
import {Observable} from 'rxjs';
import {ProductSearchValues, ProductSearchValuesWithoutPaging} from '../search/SearchObjects';

export interface ProductDAO extends CommonDAO<Product> {

    findProducts(productSearchValues: ProductSearchValues): Observable<any>;

    findProductsWithoutPaging(productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging): Observable<any>;
}
