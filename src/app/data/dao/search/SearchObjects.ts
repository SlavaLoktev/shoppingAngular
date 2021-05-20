export class CategorySearchValues {

    departmentId: number = null;
}

export class ProductSearchValues {

    productName = '';
    price: number = null;
    pageNumber = 0;
    pageSize = 5;

    sortColumn = 'productName';
    sortDirection  = 'asc';
}

export class ProductSearchValuesWithoutPaging {

    productName = '';
    price: number = null;
}

export class ReviewsSearchValues {

    product: number;
}
