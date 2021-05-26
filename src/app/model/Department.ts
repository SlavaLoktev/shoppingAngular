export class Department {
    departmentId: number;
    departmentName: string;
    route: string;


    constructor(departmentId: number, departmentName: string, route: string) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.route = route;
    }
}
