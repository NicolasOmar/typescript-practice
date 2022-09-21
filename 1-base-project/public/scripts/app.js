var testAdd = function (number1, number2, showResult) {
    if (showResult === void 0) { showResult = false; }
    var fnResult = number1 + number2;
    showResult && console.warn(fnResult);
    return fnResult;
};
var numbers = [10, 3];
testAdd(numbers[0], numbers[1], true);
