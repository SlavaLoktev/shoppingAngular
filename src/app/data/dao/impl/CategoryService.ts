import { Injectable } from '@angular/core';
import {CategoryDAO} from '../interface/CategoryDAO';
import {HttpClient} from '@angular/common/http';
import {CategorySearchValues} from '../search/SearchObjects';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';

// класс реализовывает методы доступа к данным с помощью RESTful запросов в формате JSON
// JSON формируется автоматически для параметров и результатов
@Injectable({
  providedIn: 'root'
})
export class CategoryService implements CategoryDAO{

  url = 'http://localhost:8080/category';

  constructor(private httpClient: HttpClient) { } // для выполнения HTTP запросов

  findCategories(categorySearchValues: CategorySearchValues): Observable<Category[]> {
    return this.httpClient.post<Category[]>(this.url + '/search', categorySearchValues);
  }

  add(t: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.url + '/add', t);
  }

  delete(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.url + '/id/' + id);
  }

  findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + '/all');
  }

  update(t: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.url + '/update', t);
  }
}
