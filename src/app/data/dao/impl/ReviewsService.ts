import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ReviewsDAO} from '../interface/ReviewsDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {Reviews} from '../../../model/Reviews';
import {CommonService} from './CommonService';
import {CATEGORY_URL_TOKEN} from './CategoryService';

export const REVIEWS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class ReviewsService extends CommonService<Reviews> implements ReviewsDAO{

  constructor(@Inject(REVIEWS_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }
}
