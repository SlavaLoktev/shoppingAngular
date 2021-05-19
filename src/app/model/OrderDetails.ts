import {Orders} from './Orders';
import {Product} from './Product';

export class OrderDetails{
    orderDetailId: number;
    quantity: number;
    order: Orders;
    product: Product;
    unitPrice?: number;


    constructor(orderDetailId: number,
                quantity: number,
                order: Orders,
                product: Product,
                unitPrice?: number, ) {
        this.orderDetailId = orderDetailId;
        this.quantity = quantity;
        this.order = order;
        this.product = product;
        this.unitPrice = unitPrice;
    }
}
