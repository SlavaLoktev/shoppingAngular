import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CategoryDAO} from '../interface/CategoryDAO';
import {HttpClient} from '@angular/common/http';
import {CategorySearchValues} from '../search/SearchObjects';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {CommonService} from './CommonService';

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

// класс реализовывает методы доступа к данным с помощью RESTful запросов в формате JSON
// JSON формируется автоматически для параметров и результатов
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CommonService<Category> implements CategoryDAO{

  constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
      super(baseUrl, http);
  }

  findCategories(categorySearchValues: CategorySearchValues): Observable<Category[]> {
    return this.http.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}
