import {Category} from './Category';
import {AttrValue} from './AttrValue';
import {Reviews} from './Reviews';

export class Product {
    productId: number;
    productName: string;
    storageUnit: string;
    price: number;
    discountPrice?: number;
    description: string;
    category: Category;
    attrValue: AttrValue;
    review?: Reviews;


    constructor(productId: number, productName: string, storageUnit: string, price: number, discountPrice: number, description: string,
                category: Category, attrValue: AttrValue, review: Reviews) {
        this.productId = productId;
        this.productName = productName;
        this.storageUnit = storageUnit;
        this.price = price;
        this.discountPrice = discountPrice;
        this.description = description;
        this.category = category;
        this.attrValue = attrValue;
        this.review = review;
    }
}
