"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Department = (function () {
    function Department(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    Department.prototype.describe = function () {
        console.warn('[Classes]', "The department is [".concat(this.id, "] ").concat(this.name));
    };
    Department.prototype.addEmployee = function (employeeName) {
        this.employees = __spreadArray(__spreadArray([], this.employees, true), (Array.isArray(employeeName) ? employeeName : [employeeName]), true);
    };
    Department.createNewEmployee = function (name) {
        return { name: name };
    };
    Department.fiscalYear = 2022;
    return Department;
}());
var ContractorDepartment = (function (_super) {
    __extends(ContractorDepartment, _super);
    function ContractorDepartment(id, reports) {
        if (reports === void 0) { reports = []; }
        var _this = _super.call(this, id, 'Contractor') || this;
        _this.reports = reports;
        _this.vendors = ['american', 'european'];
        return _this;
    }
    Object.defineProperty(ContractorDepartment.prototype, "getLastVendor", {
        get: function () {
            return this.vendors[this.vendors.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    ContractorDepartment.prototype.addReport = function (text) {
        this.reports = __spreadArray(__spreadArray([], this.reports, true), [text], false);
    };
    ContractorDepartment.prototype.printReports = function () {
        console.warn('[Classes]', "The reports are ".concat(this.reports.length > 0 ? this.reports.join(', ') : 'none'));
    };
    ContractorDepartment.prototype.addEmployee = function (employeeName) {
        if (employeeName === 'Passerino') {
            return;
        }
        this.employees.push(employeeName);
    };
    return ContractorDepartment;
}(Department));
var newDepartment = new Department('D1', 'Human Resources');
newDepartment.describe();
newDepartment.addEmployee(['Max', 'Anna']);
console.warn('[Classes]', Department.createNewEmployee('Nicolas'));
console.warn('[Classes]', Department.fiscalYear);
console.log('[Classes]', newDepartment);
var inheritanceDepartment = new ContractorDepartment('CD1');
inheritanceDepartment.describe();
inheritanceDepartment.addEmployee('Max');
inheritanceDepartment.addEmployee('Anna');
inheritanceDepartment.addReport('IT');
inheritanceDepartment.addReport('Accounting');
inheritanceDepartment.printReports();
console.info('[Classes]', inheritanceDepartment.getLastVendor);
console.log('[Classes]', inheritanceDepartment);
