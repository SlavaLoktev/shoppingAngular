import {Inject, Injectable, InjectionToken} from '@angular/core';
import {AttributeDAO} from '../interface/AttributeDAO';
import {HttpClient} from '@angular/common/http';
import {Attribute} from '../../../model/Attribute';
import {CommonService} from './CommonService';

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
