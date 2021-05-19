import {Orders} from './Orders';
import {Product} from './Product';

export class OrderDetails{
    orderDetailId: number;
    quantity: number;
    order: Orders;
    product: Product;


    constructor(orderDetailId: number,
                quantity: number,
                order: Orders,
                product: Product) {
        this.orderDetailId = orderDetailId;
        this.quantity = quantity;
        this.order = order;
        this.product = product;
    }
}
