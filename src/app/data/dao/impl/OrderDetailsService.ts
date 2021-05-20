import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CommonService} from './CommonService';
import {OrderDetails} from '../../../model/OrderDetails';
import {HttpClient} from '@angular/common/http';
import {OrderDetailsDAO} from '../interface/OrderDetailsDAO';

export const ORDERDETAILS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService extends CommonService<OrderDetails> implements OrderDetailsDAO{

  constructor(
      @Inject(ORDERDETAILS_URL_TOKEN) private baseUrl,
      private http: HttpClient
  ) {
    super(baseUrl, http);
  }
}
