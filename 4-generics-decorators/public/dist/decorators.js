"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function LoggerWithFactory(logString) {
    return function (constructor) {
        console.log('[Decorators]', logString, constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const htmlElement = document.getElementById(hookId);
                htmlElement && (htmlElement.innerHTML = template !== null && template !== void 0 ? template : this.name);
            }
        };
    };
}
function PropertyLog(target, propertyName) {
    console.log('[Decorators]', 'Property decorator', target, propertyName);
}
function AccessorSetLog(target, name, descriptor) {
    console.log('[Decorators]', 'Accessor decorator', target, name, descriptor);
}
function AccessorMethodLog(target, name, descriptor) {
    console.log('[Decorators]', 'Method decorator', target, name, descriptor);
}
function AccessorParameterLog(target, name, position) {
    console.log('[Decorators]', 'Parameter decorator', target, name, position);
}
let Person = class Person {
    set price(value) {
        if (value > 0) {
            this._price = value;
        }
    }
    constructor(_price = 10) {
        this._price = _price;
        this.name = 'Max';
        console.log('[Decorators]', 'Creating a new person...');
    }
    getPriceWithTax(tax = 10) {
        return this._price * (1 + tax);
    }
};
__decorate([
    PropertyLog
], Person.prototype, "name", void 0);
__decorate([
    AccessorSetLog
], Person.prototype, "price", null);
__decorate([
    AccessorMethodLog,
    __param(0, AccessorParameterLog)
], Person.prototype, "getPriceWithTax", null);
Person = __decorate([
    LoggerWithFactory('LogString'),
    WithTemplate(null, 'app-paragraph')
], Person);
function AutoBind(_, __, descriptor) {
    const originalMethod = descriptor.value;
    const customDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return customDescriptor;
}
const _person = new Person();
console.warn('[Decorators]', _person);
class Printer {
    constructor(message = 'This printer works!') {
        this.message = message;
    }
    showMessage() {
        console.warn('[Decorators]', this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const _printer = new Printer();
const button = document.getElementById('printer-button');
_printer.showMessage();
button === null || button === void 0 ? void 0 : button.addEventListener('click', _printer.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function validate(_obj) {
    let isValid = true;
    const objValidatorsConfig = registeredValidators[_obj.constructor.name];
    if (!objValidatorsConfig) {
        return true;
    }
    for (const propName in objValidatorsConfig) {
        for (const propValidator of (objValidatorsConfig[propName] || [])) {
            switch (propValidator) {
                case 'required':
                    isValid = isValid && !!_obj[propName];
                case 'positive':
                    isValid = isValid && +_obj[propName] > 0;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(_title, _price) {
        this.title = _title;
        this.price = _price;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm === null || courseForm === void 0 ? void 0 : courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElement = document.getElementById('title');
    const priceElement = document.getElementById('price');
    const createdCourse = new Course(titleElement.value, +priceElement.value);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.warn('[Decorators]', createdCourse);
});
