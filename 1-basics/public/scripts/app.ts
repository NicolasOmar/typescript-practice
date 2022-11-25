const testAdd = (number1: number, number2: number, showResult: boolean = false) => {
  const fnResult = number1 + number2
  showResult && console.warn(fnResult)
  return fnResult
}

const numbers = [10, 3]

testAdd(numbers[0], numbers[1], true)

enum Role {
  ADMIN,
  USER,
  AUTHOR
}

const person: {
  age: number,
  name: string,
  hobbies: string[],
  // TUPLE, only permits the specified amount of items with its asigned types
  roles: [number, Role]
} = {
  age: 15,
  name: 'Test person',
  hobbies: ['Sports', 'Arts'],
  roles: [0, Role.ADMIN]
}

for (const hobby of person.hobbies) {
  console.warn(`OBJECTS, ARRAYS & TUPLE: ${person.name} likes ${hobby.toLocaleUpperCase()}`)
}

// You can create CUSTOM/LITERAL TYPES to save unnecesary duplication
type NumberString = number | string
type ConversionType = 'as-number' | 'as-text'

// UNION TYPES, you can set more that one specific type to handle different kind of data
const combineData = (
  input1: NumberString,
  input2: NumberString,
  resultConversion: ConversionType
) => resultConversion === 'as-number' ? +input1 + +input2 : `${input1.toString()}${input2.toString()}`

console.warn(
  'LITERAL & UNION TYPES',
  combineData(15, 33, 'as-number'),
  combineData('500', '1', 'as-number'),
  combineData('Maria', 'Marta', 'as-text')
)

// FUNCTION RETURN TYPE, after setting the arguments, you can add a specific return type to avoid type inference
const testAddWithType = (n1: number, n2: number): number => n1 + n2

// VOID TYPE is used when the function doesnt return anything
const printResult = (num: number): void => console.info('Printing result: ', num)

printResult(testAddWithType(1, 3)),
printResult(testAddWithType(2, 3)),
printResult(testAddWithType(3, 3))

console.info(
  'VOID TYPE',
  printResult(testAddWithType(1, 3)),
  printResult(testAddWithType(2, 3)),
  printResult(testAddWithType(3, 3))  
)

// If you try to return a undefined type value, you must indicate a return statement without anything else
// BUT, is preffered that your functions return a void value instead to avoid writing the empty return statement
const returnUndefined = (): undefined => { return }

console.info(
  'UNDEFINED TYPE',
  returnUndefined(),
  returnUndefined(),
  returnUndefined()
)

// FUNCTION TYPE is used to return another function
let returnFunction: Function
// In the following cases, you return an empty function and a functions without been executed
returnFunction = () => {}
returnFunction = function () {}
returnFunction = returnUndefined

// Here the function needs a specific type of function which will recieve two numbers and return another number
let returnNumberFunction: (a: number, b: number) => number
const addNumbers = (n1: number, n2: number) => (n1 + n2)
returnNumberFunction = addNumbers

// On this case, you using a function callback as a parameter wich will recieve a result and handle it without care about what is going to return
let addAndHandle = (n1: number, n2: number, cb: (n3: number) => void) => cb(n1 + n2)
addAndHandle(3, 5, printResult)

// UNKNOWN TYPE, we dont know yet what the user is going to input
let userInput: unknown
let userName: string

userInput = 5
userInput = '5'
userInput = null
/* Unknown type is used to check other variables types before assign its value.
 * If a string variable tries to be assigned to a unknown one, it will break the compilation
 * unless you check its typeof before
 * Is a better alternative than use any (for previous type checking)
*/
if (typeof userInput === 'string') {
  userName = userInput
}

/* VOID/NEVER TYPE is used when you want a function does not retun any value
 * It can be used for special cases as error handling, because it does not return
 * a value, it just throws an error
*/
const generateError = (message: string, code: number): void | never => {
  throw { message, errorCode: code }
}
generateError('An error ocurred!', 500)