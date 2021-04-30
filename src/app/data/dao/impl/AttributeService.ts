import { Injectable } from '@angular/core';
import {AttributeDAO} from '../interface/AttributeDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {Attribute} from '../../../model/Attribute';

@Injectable({
  providedIn: 'root'
})
export class AttributeService implements AttributeDAO{

  url = 'http://localhost:8080/attribute';

  constructor(private httpClient: HttpClient) { }

  add(t: Attribute): Observable<Attribute> {
    return this.httpClient.post<Attribute>(this.url + '/add', t);
  }

  delete(id: number): Observable<Attribute> {
    return this.httpClient.delete<Attribute>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<Attribute> {
    return this.httpClient.get<Attribute>(this.url + '/id/' + id);
  }

  findAll(): Observable<Attribute[]> {
    return this.httpClient.get<Attribute[]>(this.url + '/all');
  }

  update(t: Attribute): Observable<Attribute> {
    return this.httpClient.put<Attribute>(this.url + '/update', t);
  }
}
