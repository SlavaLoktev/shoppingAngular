import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './CommonService';
import {Orders} from '../../../model/Orders';
import {OrdersDAO} from '../interface/OrdersDAO';

export const ORDERS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends CommonService<Orders> implements OrdersDAO{

  constructor(
      @Inject(ORDERS_URL_TOKEN) private baseUrl,
      private http: HttpClient
  ) {
    super(baseUrl, http);
  }
}
