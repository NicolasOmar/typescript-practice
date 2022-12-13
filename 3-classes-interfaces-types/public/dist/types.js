"use strict";
var _firstEmployee = {
    name: 'First emp',
    privileges: ['server-admin'],
    startDate: new Date()
};
var addFunction = function (_numberOne, _numberTwo) {
    var areStrings = [_numberOne, _numberTwo].every(function (_combinable) { return typeof _combinable === 'string'; });
    return areStrings
        ? "".concat(_numberOne.toLocaleString(), " ").concat(_numberTwo.toLocaleString())
        : +_numberOne + +_numberTwo;
};
var printEmployeeInformation = function (emp) {
    console.info('[Types]', "Name: ".concat(emp.name), "Privileges: [".concat('privileges' in emp ? emp.privileges : 'none', "]"), "StartDate: ".concat('startDate' in emp ? emp.startDate : 'none'));
};
printEmployeeInformation(_firstEmployee);
printEmployeeInformation({ name: 'Common user', startDate: new Date() });
var Car = (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log('[Types]', 'Driving a Car...');
    };
    return Car;
}());
var Truck = (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log('[Types]', 'Driving a Truck...');
    };
    Truck.prototype.loadCargo = function (amount) {
        console.log('[Types]', "Loading cargo of ... ".concat(amount.toLocaleString(), " Kg"));
    };
    return Truck;
}());
var _vehicleOne = new Car();
var _vehicleTwo = new Truck();
var useVehicle = function (vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};
useVehicle(_vehicleOne);
useVehicle(_vehicleTwo);
var moveAnimal = function (_animal) {
    var speed = 0;
    switch (_animal.type) {
        case 'bird':
            speed = _animal.flyingSpeed;
            break;
        case "horse":
            speed = _animal.runningSpeed;
            break;
    }
    console.warn('[Types]', "Is moving at speed of ".concat(speed, " km/h"));
};
moveAnimal({ type: "bird", flyingSpeed: 20 });
moveAnimal({ type: "horse", runningSpeed: 10 });
var userInputElementOne = document.getElementById('user-input-one');
var userInputElementTwo = document.getElementById('user-input-two');
var userInputElementThree = document.getElementById('user-input-three');
userInputElementOne.innerHTML = 'Hello there';
userInputElementTwo.innerHTML = 'General Kenobi';
if (userInputElementThree) {
    userInputElementThree.innerHTML = '[Will continue...]';
}
function overAdd(a, b) {
    var isString = [a, b].every(function (value) { return typeof value === 'string'; });
    return isString
        ? "".concat(a, " ").concat(b)
        : +a + +b;
}
console.warn('[Types]', overAdd('Max', 'Power'));
