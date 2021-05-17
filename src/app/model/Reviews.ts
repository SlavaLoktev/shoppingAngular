import {Product} from './Product';
import {Customers} from './Customers';

export class Reviews {
    reviewId: number;
    text: string;
    reviewDate: Date;
    rating: number;
    product: Product;
    customers: Customers;

    constructor(reviewId: number, text: string, reviewDate: Date, rating: number, productId: Product, customerId: Customers) {
        this.reviewId = reviewId;
        this.text = text;
        this.reviewDate = reviewDate;
        this.rating = rating;
        this.product = productId;
        this.customers = customerId;
    }
}
