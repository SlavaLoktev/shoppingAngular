import {Inject, Injectable, InjectionToken} from '@angular/core';
import {DepartmentDAO} from '../interface/DepartmentDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {Department} from '../../../model/Department';
import {CommonService} from './CommonService';
import {CATEGORY_URL_TOKEN} from './CategoryService';

export const DEPARTMENT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends CommonService<Department> implements DepartmentDAO{

  constructor(@Inject(DEPARTMENT_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }
}
