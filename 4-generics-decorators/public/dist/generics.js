"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var names = [];
var genericNames = [];
var genericPromise = new Promise(function (resolve) { return setTimeout(function () { return resolve('Hello there'); }, 2000); });
genericPromise.then(function (result) { return result.split(', '); });
var merge = function (objA, objB) { return (__assign(__assign({}, objA), objB)); };
function genericMerge(objA, objB) {
    return __assign(__assign({}, objA), objB);
}
var mergedObject = merge({ name: 'test' }, { status: true });
var genericMergedObject = genericMerge({ name: 'test' }, { status: true });
genericMergedObject.name;
function conuntAndDescribe(element) {
    var descriptionText = element.length === 1
        ? 'Has 1 value'
        : element.length > 1
            ? "Has ".concat(element.length, " values")
            : 'Has no value';
    return [element, descriptionText];
}
console.warn('[Generics]', conuntAndDescribe(['Mathematics', 'History']));
function extractAndConvert(obj, key) {
    return "Key/property: ".concat(key.toString(), ", Value: ").concat(obj[key]);
}
console.warn('[Generics]', extractAndConvert({ name: 'test ' }, 'name'));
var DataStorage = (function () {
    function DataStorage() {
        this.data = [];
    }
    DataStorage.prototype.addItem = function (item) {
        this.data = __spreadArray(__spreadArray([], this.data, true), [item], false);
    };
    DataStorage.prototype.removeItem = function (item) {
        this.data = this.data.filter(function (_item) { return _item !== item; });
    };
    DataStorage.prototype.getItems = function () {
        return __spreadArray([], this.data, true);
    };
    return DataStorage;
}());
var textStorage = new DataStorage();
textStorage.addItem('2');
textStorage.addItem('test');
textStorage.addItem('deletable');
textStorage.removeItem('deletable');
var multipleStorage = new DataStorage();
multipleStorage.addItem('2');
multipleStorage.addItem('test');
multipleStorage.addItem(2);
multipleStorage.addItem(0);
multipleStorage.removeItem(0);
console.info('[Generics]', textStorage.getItems());
console.info('[Generics]', multipleStorage.getItems());
