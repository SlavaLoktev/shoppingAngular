export class CategorySearchValues {

    departmentId: number = null;
}

export class ProductSearchValues {

    // начальные значения по умолчанию
    productName = '';
    price: number = null;
    pageNumber = 0;
    pageSize = 5;

    // сортировка
    sortColumn = 'productName';
    sortDirection  = 'asc';
}

export class ProductSearchValuesWithoutPaging {

    productName = '';
    price: number = null;
}
