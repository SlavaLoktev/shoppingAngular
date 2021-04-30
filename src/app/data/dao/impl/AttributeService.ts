import {Inject, Injectable, InjectionToken} from '@angular/core';
import {AttributeDAO} from '../interface/AttributeDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {Attribute} from '../../../model/Attribute';
import {CommonService} from './CommonService';
import {CATEGORY_URL_TOKEN} from './CategoryService';

export const ATTRIBUTE_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class AttributeService extends CommonService<Attribute> implements AttributeDAO{

  constructor(@Inject(ATTRIBUTE_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }
}
