import { Injectable } from '@angular/core';
import {AttrValueDAO} from '../interface/AttrValueDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {AttrValue} from '../../../model/AttrValue';

@Injectable({
  providedIn: 'root'
})
export class AttrValueService implements AttrValueDAO{

  url = 'http://localhost:8080/attrvalue';

  constructor(private httpClient: HttpClient) { }

  add(t: AttrValue): Observable<AttrValue> {
    return this.httpClient.post<AttrValue>(this.url + '/add', t);
  }

  delete(id: number): Observable<AttrValue> {
    return this.httpClient.delete<AttrValue>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<AttrValue> {
    return this.httpClient.get<AttrValue>(this.url + '/id/' + id);
  }

  findAll(): Observable<AttrValue[]> {
    return this.httpClient.get<AttrValue[]>(this.url + '/all');
  }

  update(t: AttrValue): Observable<AttrValue> {
    return this.httpClient.put<AttrValue>(this.url + '/update', t);
  }
}
