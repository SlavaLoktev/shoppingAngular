import {CommonDAO} from './CommonDAO';
import {Product} from '../../../model/Product';
import {Observable} from 'rxjs';
import {ProductSearchValues, ProductSearchValuesWithoutPaging} from '../search/SearchObjects';

export interface ProductDAO extends CommonDAO<Product> {

    // поиск категорий по любым параметрам, указанным в CategorySearchValues
    // если какой либо параметр равен null - он не будет учитываться при поиске
    findProducts(productSearchValues: ProductSearchValues): Observable<any>;

    findProductsWithoutPaging(productSearchValuesWithoutPaging: ProductSearchValuesWithoutPaging): Observable<any>;
}
