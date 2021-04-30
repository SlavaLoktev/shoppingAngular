import { Injectable } from '@angular/core';
import {ReviewsDAO} from '../interface/ReviewsDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {Reviews} from '../../../model/Reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService implements ReviewsDAO{

  url = 'http://localhost:8080/reviews';

  constructor(private httpClient: HttpClient) { }

  add(t: Reviews): Observable<Reviews> {
    return this.httpClient.post<Reviews>(this.url + '/add', t);
  }

  delete(id: number): Observable<Reviews> {
    return this.httpClient.delete<Reviews>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<Reviews> {
    return this.httpClient.get<Reviews>(this.url + '/id/' + id);
  }

  findAll(): Observable<Reviews[]> {
    return this.httpClient.get<Reviews[]>(this.url + '/all');
  }

  update(t: Reviews): Observable<Reviews> {
    return this.httpClient.put<Reviews>(this.url + '/update', t);
  }
}
