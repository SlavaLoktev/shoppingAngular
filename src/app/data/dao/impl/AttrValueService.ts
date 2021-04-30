import {Inject, Injectable, InjectionToken} from '@angular/core';
import {AttrValueDAO} from '../interface/AttrValueDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {AttrValue} from '../../../model/AttrValue';
import {CommonService} from './CommonService';
import {CATEGORY_URL_TOKEN} from './CategoryService';

export const ATTRVALUE_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class AttrValueService extends CommonService<AttrValue> implements AttrValueDAO{

  constructor(@Inject(ATTRVALUE_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }
}
