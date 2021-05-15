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
    categories: Category;
    attrValue?: AttrValue;
    review?: Reviews;
    image?: string;
    imageSmall?: string;

    oldCategory?: Category;


    constructor(productId: number,
                productName: string,
                storageUnit: string,
                price: number,
                discountPrice: number,
                description: string,
                categories: Category,
                attrValue?: AttrValue,
                review?: Reviews,
                image?: string,
                imageSmall?: string,
                oldCategory?: Category) {
        this.productId = productId;
        this.productName = productName;
        this.storageUnit = storageUnit;
        this.price = price;
        this.discountPrice = discountPrice;
        this.description = description;
        this.categories = categories;
        this.attrValue = attrValue;
        this.review = review;
        this.image = image;
        this.imageSmall = imageSmall;
        this.oldCategory = oldCategory;
    }
}
