import {Category} from '../model/Category';
import {Department} from '../model/Department';
import {Attribute} from '../model/Attribute';
import {AttrValue} from '../model/AttrValue';
import {Product} from '../model/Product';
import {Reviews} from '../model/Reviews';
import {Customers} from '../model/Customers';

export class TestData {

    static departments: Department[] = [
        {departmentId: 1, departmentName: 'Женский'},
        {departmentId: 2, departmentName: 'Мужской'},
        {departmentId: 3, departmentName: 'Детский'},
        {departmentId: 4, departmentName: 'Аксессуары'}
    ];

    static categories: Category[] = [
        {categoryId: 1, categoryName: 'Балетки', departmentId: TestData.departments[0]},
        {categoryId: 2, categoryName: 'Босоножки', departmentId: TestData.departments[0]},
        {categoryId: 3, categoryName: 'Кеды', departmentId: TestData.departments[0]},
        {categoryId: 4, categoryName: 'Ботинки', departmentId: TestData.departments[0]},
        {categoryId: 5, categoryName: 'Ботфорты', departmentId: TestData.departments[0]},
        {categoryId: 6, categoryName: 'Дутики', departmentId: TestData.departments[0]},
        {categoryId: 7, categoryName: 'Лоферы', departmentId: TestData.departments[0]},
        {categoryId: 8, categoryName: 'Мокасины', departmentId: TestData.departments[1]},
        {categoryId: 9, categoryName: 'Ботинки', departmentId: TestData.departments[1]},
        {categoryId: 10, categoryName: 'Спортивная обувь', departmentId: TestData.departments[1]},
        {categoryId: 11, categoryName: 'Туфли', departmentId: TestData.departments[1]},
        {categoryId: 12, categoryName: 'Сумка', departmentId: TestData.departments[0]},
    ];

    static attributes: Attribute[] = [
        {attributeId: 1, attributeName: 'Артикул'},
        {attributeId: 2, attributeName: 'Бренд'},
        {attributeId: 3, attributeName: 'Страна производитель'},
        {attributeId: 4, attributeName: 'Размер'},
        {attributeId: 5, attributeName: 'Материал'},
        {attributeId: 6, attributeName: 'Цвет'},
    ];

    static attrValues: AttrValue[] = [
        {attrValueId: 1, attrValue: '40001', attributeId: TestData.attributes[0]},
        {attrValueId: 2, attrValue: 'delta', attributeId: TestData.attributes[1]},
        {attrValueId: 3, attrValue: 'Россия', attributeId: TestData.attributes[2]},
        {attrValueId: 4, attrValue: '42', attributeId: TestData.attributes[3]},
        {attrValueId: 5, attrValue: 'Кожа', attributeId: TestData.attributes[4]},
        {attrValueId: 6, attrValue: 'Черный', attributeId: TestData.attributes[5]},
        {attrValueId: 7, attrValue: '40002', attributeId: TestData.attributes[0]}
    ];

    static products: Product[] = [
        {
            productId: 1,
            productName: 'ботинки мужские',
            storageUnit: 'пар',
            price: 4999,
            description: 'adsadsa',
            category: TestData.categories[8],
            attrValue: TestData.attrValues[1]
        },
        {
            productId: 2,
            productName: 'кеды женские',
            storageUnit: 'пар',
            price: 2000,
            description: 'adfscc',
            category: TestData.categories[2],
            attrValue: TestData.attrValues[3]
        },
        {
            productId: 3,
            productName: 'кроссовки мужские',
            storageUnit: 'пар',
            price: 5000,
            discountPrice: 4000,
            description: 'asdgegeg',
            category: TestData.categories[9],
            attrValue: TestData.attrValues[1]
        },
        {
            productId: 4,
            productName: 'лоферы женские',
            storageUnit: 'пар',
            price: 6000,
            discountPrice: 5500,
            description: 'vwvreber',
            category: TestData.categories[6],
            attrValue: TestData.attrValues[1]
        },
        {
            productId: 5,
            productName: 'сумка женская',
            storageUnit: 'шт',
            price: 5000,
            description: 'rfwwrvwju',
            category: TestData.categories[11],
            attrValue: TestData.attrValues[1]
        }
    ];

    static customers: Customers[] = [
        {   customerId: 1,
            custFirstName: 'Иван',
            custLastName: 'Иванов',
            phoneNumber: '89066829443',
            custEmail: 'IvanIvanov@mail.ru',
            birthday: new Date('1990-08-03'),
            gender: 'муж'
        },
        {   customerId: 2,
            custFirstName: 'Петр',
            custLastName: 'Васильев',
            phoneNumber: '89610759463',
            custEmail: 'PetrVas@gmail.com',
            birthday: new Date('2000-01-20'),
            gender: 'муж'
        },
        {   customerId: 3,
            custFirstName: 'Виктория',
            custLastName: 'Волкова',
            phoneNumber: '89056824625',
            custEmail: 'vik99@yandex.ru',
            birthday: new Date('1999-12-25'),
            gender: 'жен'
        }
    ];

    static reviews: Reviews[] = [
        {   reviewId: 1,
            text: 'Хорошие макасины',
            reviewDate: new Date('2020-12-25'),
            rating: 5,
            customerId: TestData.customers[0],
            productId: TestData.products[0]
        },
        {   reviewId: 2,
            text: '',
            reviewDate: new Date('2021-01-31'),
            rating: 4,
            customerId: TestData.customers[1],
            productId: TestData.products[1]
        }
    ];
}
