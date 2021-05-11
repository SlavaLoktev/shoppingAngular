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
    attrValue?: AttrValue;
    review?: Reviews;

    oldCategory?: Category;


    constructor(productId: number, productName: string, storageUnit: string, price: number, discountPrice: number, description: string,
                category: Category, attrValue?: AttrValue, review?: Reviews, oldCategory?: Category) {
        this.productId = productId;
        this.productName = productName;
        this.storageUnit = storageUnit;
        this.price = price;
        this.discountPrice = discountPrice;
        this.description = description;
        this.category = category;
        this.attrValue = attrValue;
        this.review = review;
        this.oldCategory = oldCategory;
    }
}
