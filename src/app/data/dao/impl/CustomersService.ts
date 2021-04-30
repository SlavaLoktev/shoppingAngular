import { Injectable } from '@angular/core';
import {CustomersDAO} from '../interface/CustomersDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {Customers} from '../../../model/Customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements CustomersDAO{

  url = 'http://localhost:8080/customers';

  constructor(private httpClient: HttpClient) { }

  add(t: Customers): Observable<Customers> {
    return this.httpClient.post<Customers>(this.url + '/add', t);
  }

  delete(id: number): Observable<Customers> {
    return this.httpClient.delete<Customers>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<Customers> {
    return this.httpClient.get<Customers>(this.url + '/id/' + id);
  }

  findAll(): Observable<Customers[]> {
    return this.httpClient.get<Customers[]>(this.url + '/all');
  }

  update(t: Customers): Observable<Customers> {
    return this.httpClient.put<Customers>(this.url + '/update', t);
  }
}
