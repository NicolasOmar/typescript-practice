type Admin = {
  name: string
  privileges: string[]
}

type Employee = {
  name: string
  startDate: Date
}

// INTERSECTION TYPE/OPERATOR, BUILDS THE INTERSECTION BETWEEN 2 OR MORE TYPES
// CAN BE IMPLEMENTED BY USING INTERFACES AND CREATE A NEW ONE IMPLEMENTING THE PREVIOUS TWO
type ElevatedEmployee = Admin & Employee

const _firstEmployee: ElevatedEmployee = {
  name: 'First emp',
  privileges: ['server-admin'],
  startDate: new Date()
}

// 'TYPE GUARDS', HELPS CHECKING A TYPE IS A SPECIFIC TYPE (USABLE FOR UNION TYPES TO KNOW THE SPECIFIC TYPE)
// ONE GOOD CASE IS WHEN YOU ARE USING 'TYPEOF' AS TYPE CHECKING
type Combinable = string | number
const addFunction = (_numberOne: Combinable, _numberTwo: Combinable) => {
  const areStrings = [_numberOne, _numberTwo].every(_combinable => typeof _combinable === 'string')

  return areStrings
    ? `${_numberOne.toLocaleString()} ${_numberTwo.toLocaleString()}`
    : +_numberOne + +_numberTwo
}

// TYPE GUARD CASES
// 'TYPEOF' IS USABLE FOR JAVASCRIPT PRIMITIVE TYPES ONLY, NOT FOR
// CLASSES OR TYPES (BECAUSE WORK ON JS RUNTIME)
type UnknownEmployee = Employee | Admin
const printEmployeeInformation = (emp: UnknownEmployee) => {
  console.info(
    '[Types]',
    `Name: ${emp.name}`,
    `Privileges: [${'privileges' in emp ? emp.privileges : 'none'}]`,
    `StartDate: ${'startDate' in emp ? emp.startDate : 'none'}`
  )
}

printEmployeeInformation(_firstEmployee)
printEmployeeInformation({ name: 'Common user', startDate: new Date() })


// TYPE GUARD CASES, 'INSTANCEOF'
class Car {
  drive() {
    console.log('[Types]', 'Driving a Car...')
  }
}

class Truck {
  drive() {
    console.log('[Types]', 'Driving a Truck...')
  }

  loadCargo(amount: number) {
    console.log('[Types]', `Loading cargo of ... ${amount.toLocaleString()} Kg`)
  }
}

type Vehicle = Car | Truck
const _vehicleOne = new Car()
const _vehicleTwo = new Truck()

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive()
  // 'INSTANCEOF' IS USEFUL TO CHECK IF A CERTAIN PROPERTY OR METHOD IS USABLE BY ASIKING
  // IF A OBJECT IS A INSTANCE OF A TYPE OR CLASS
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(_vehicleOne)
useVehicle(_vehicleTwo)

// DISCRIMINATED UNION CASES
// 'TYPE' IS A INTERNAL PROPERTY USED TO DIFFERENCIATE DIFFERENT INTERFACES IN UNION TYPES
// CAN BE USED TO AVOID CHECKING SPECIFIC PROPERTIES OR METHODS OF A INTERFACE
interface Bird {
  type: 'bird',
  flyingSpeed: number
}

interface Horse {
  type: 'horse',
  runningSpeed: number
}

type Animal = Bird | Horse

const moveAnimal = (_animal: Animal): void => {
  let speed: number = 0
  switch(_animal.type) {
    case 'bird':
      speed = _animal.flyingSpeed
      break
    case "horse":
      speed = _animal.runningSpeed
      break
  }
  console.warn('[Types]', `Is moving at speed of ${speed} km/h`)
}

moveAnimal({ type: "bird", flyingSpeed: 20 })
moveAnimal({ type: "horse", runningSpeed: 10 })

// TYPE CASTING
// BY ADDING '<>', YOU CAN CAST A VALUE IN A SPECIFIC TYPE TO GET CERTAIN PROPERTIES
// YOU CAN ALSO USE A SINTAXIS LIKE THE SECOND LINE, '! as TYPE_YOU_WANT_TO_CAST_ON'
const userInputElementOne = <HTMLInputElement>document.getElementById('user-input-one')
const userInputElementTwo = document.getElementById('user-input-two')! as HTMLInputElement
const userInputElementThree = document.getElementById('user-input-three')

userInputElementOne.innerHTML = 'Hello there'
userInputElementTwo.innerHTML = 'General Kenobi'
if (userInputElementThree) {
  (userInputElementThree as HTMLInputElement).innerHTML = '[Will continue...]'
}

// FUNCTION OVERLOADS
// HELPS TO CREATE DIFFERENT VARIATIONS OF A SAME FUNCTION WHICH CAN RECIEVE DIFFERENT TYPES
// AND REACT WITH DIFFERENT RETURN VALUES
function overAdd(a: number, b: number): number
function overAdd(a: number, b: string): string
function overAdd(a: string, b: number): string
function overAdd(a: string, b: string): string
function overAdd(a: Combinable, b: Combinable) {
  const isString = [a, b].every(value => typeof value === 'string')
  return isString
    ? `${a} ${b}`
    : +a + +b
}

console.warn('[Types]', overAdd('Max', 'Power'))