"use strict";
var _userOne;
_userOne = {
    name: 'First user',
    age: 100,
    greet: function (greeting) { return console.log('[Interfaces]', greeting); }
};
_userOne.greet('Hello there new user');
var GreetablePerson = (function () {
    function GreetablePerson(_name) {
        this.name = _name;
    }
    GreetablePerson.prototype.greet = function (greeting) {
        console.warn('[Interfaces]', "".concat(greeting, " ").concat(this.name));
    };
    return GreetablePerson;
}());
var _personOne = new GreetablePerson('Test Person');
console.log('[Interfaces]', _personOne);
_personOne.greet('Hello there');
