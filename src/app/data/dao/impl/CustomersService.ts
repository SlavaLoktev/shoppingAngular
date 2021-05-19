import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CustomersDAO} from '../interface/CustomersDAO';
import {HttpClient} from '@angular/common/http';
import {Customers} from '../../../model/Customers';
import {CommonService} from './CommonService';

export const CUSTOMERS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends CommonService<Customers> implements CustomersDAO{

  constructor(@Inject(CUSTOMERS_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }
}
