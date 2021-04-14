import {Department} from './Department';

export class Category {
    categoryId: number;
    categoryName: string;
    departmentId: Department;

    constructor(categoryId: number, categoryName: string, departmentId: Department) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.departmentId = departmentId;
    }
}
