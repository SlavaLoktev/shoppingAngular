import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ReviewsDAO} from '../interface/ReviewsDAO';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reviews} from '../../../model/Reviews';
import {CommonService} from './CommonService';
import {ReviewsSearchValues} from '../search/SearchObjects';

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

  findReviews(reviewsSearchValues: ReviewsSearchValues): Observable<Reviews[]> {
    return this.http.post<Reviews[]>(this.baseUrl + '/search', reviewsSearchValues);
  }
}
