import { Injectable } from '@angular/core';
import {DepartmentDAO} from '../interface/DepartmentDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {Department} from '../../../model/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements DepartmentDAO{

  url = 'http://localhost:8080/department';

  constructor(private httpClient: HttpClient) { }

  add(t: Department): Observable<Department> {
    return this.httpClient.post<Department>(this.url + '/add', t);
  }

  delete(id: number): Observable<Department> {
    return this.httpClient.delete<Department>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<Department> {
    return this.httpClient.get<Department>(this.url + '/id/' + id);
  }

  findAll(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.url + '/all');
  }

  update(t: Department): Observable<Department> {
    return this.httpClient.put<Department>(this.url + '/update', t);
  }
}
