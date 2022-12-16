"use strict";
const names = [];
const genericNames = [];
const genericPromise = new Promise((resolve) => setTimeout(() => resolve('Hello there'), 2000));
genericPromise.then(result => result.split(', '));
const merge = (objA, objB) => (Object.assign(Object.assign({}, objA), objB));
function genericMerge(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
}
const mergedObject = merge({ name: 'test' }, { status: true });
const genericMergedObject = genericMerge({ name: 'test' }, { status: true });
genericMergedObject.name;
function conuntAndDescribe(element) {
    const descriptionText = element.length === 1
        ? 'Has 1 value'
        : element.length > 1
            ? `Has ${element.length} values`
            : 'Has no value';
    return [element, descriptionText];
}
console.warn('[Generics]', conuntAndDescribe(['Mathematics', 'History']));
function extractAndConvert(obj, key) {
    return `Key/property: ${key.toString()}, Value: ${obj[key]}`;
}
console.warn('[Generics]', extractAndConvert({ name: 'test ' }, 'name'));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data = [...this.data, item];
    }
    removeItem(item) {
        this.data = this.data.filter(_item => _item !== item);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('2');
textStorage.addItem('test');
textStorage.addItem('deletable');
textStorage.removeItem('deletable');
const multipleStorage = new DataStorage();
multipleStorage.addItem('2');
multipleStorage.addItem('test');
multipleStorage.addItem(2);
multipleStorage.addItem(0);
multipleStorage.removeItem(0);
console.info('[Generics]', textStorage.getItems());
console.info('[Generics]', multipleStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.date = date;
    return courseGoal;
}
const untouchableNames = ['Max', 'Mark'];
