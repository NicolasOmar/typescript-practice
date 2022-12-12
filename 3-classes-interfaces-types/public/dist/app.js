"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.warn(`The department is [${this.id}] ${this.name}`);
    }
    addEmployee(employeeName) {
        this.employees = [...this.employees, ...(Array.isArray(employeeName) ? employeeName : [employeeName])];
    }
    static createNewEmployee(name) {
        return { name };
    }
}
Department.fiscalYear = 2022;
class ContractorDepartment extends Department {
    constructor(id, reports = []) {
        super(id, 'Contractor');
        this.reports = reports;
        this.vendors = ['american', 'european'];
    }
    get getLastVendor() {
        return this.vendors[this.vendors.length - 1];
    }
    addReport(text) {
        this.reports = [...this.reports, text];
    }
    printReports() {
        console.warn(`The reports are ${this.reports.length > 0 ? this.reports.join(', ') : 'none'}`);
    }
    addEmployee(employeeName) {
        if (employeeName === 'Passerino') {
            return;
        }
        this.employees.push(employeeName);
    }
}
const newDepartment = new Department('D1', 'Human Resources');
newDepartment.describe();
newDepartment.addEmployee(['Max', 'Anna']);
console.warn(Department.createNewEmployee('Nicolas'));
console.warn(Department.fiscalYear);
console.log(newDepartment);
const inheritanceDepartment = new ContractorDepartment('CD1');
inheritanceDepartment.describe();
inheritanceDepartment.addEmployee('Max');
inheritanceDepartment.addEmployee('Anna');
inheritanceDepartment.addReport('IT');
inheritanceDepartment.addReport('Accounting');
inheritanceDepartment.printReports();
console.info(inheritanceDepartment.getLastVendor);
console.log(inheritanceDepartment);
