export class Customers {
    customerId: number;
    custFirstName: string;
    custLastName: string;
    phoneNumber: string;
    custEmail: string;
    birthday: Date;
    gender: string;

    constructor(customerId: number, custFirstName: string, custLastName: string, phoneNumber: string, custEmail: string, birthday: Date,
                gender: string) {
        this.customerId = customerId;
        this.custFirstName = custFirstName;
        this.custLastName = custLastName;
        this.phoneNumber = phoneNumber;
        this.custEmail = custEmail;
        this.birthday = birthday;
        this.gender = gender;
    }
}
