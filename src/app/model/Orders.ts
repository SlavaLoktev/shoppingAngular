export class Orders{
    orderId: number;
    quantity: number;
    customerAddress: string;
    customerEmail: string;
    customerFirstName: string;
    customerLastName: string;
    customerPhone: string;
    orderDate?: Date;
    orderTotal?: number;


    constructor(orderId: number,
                quantity: number,
                customerAddress: string,
                customerEmail: string,
                customerFirstName: string,
                customerLastName: string,
                customerPhone: string,
                orderDate?: Date,
                orderTotal?: number) {
        this.orderId = orderId;
        this.quantity = quantity;
        this.customerAddress = customerAddress;
        this.customerEmail = customerEmail;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.customerPhone = customerPhone;
        this.orderDate = orderDate;
        this.orderTotal = orderTotal;
    }
}
