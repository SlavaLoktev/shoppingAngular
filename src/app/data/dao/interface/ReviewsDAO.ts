import {CommonDAO} from './CommonDAO';
import {Reviews} from '../../../model/Reviews';
import {ReviewsSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';

export interface ReviewsDAO extends CommonDAO<Reviews> {

    findReviews(reviewsSearchValues: ReviewsSearchValues): Observable<any>;
}
