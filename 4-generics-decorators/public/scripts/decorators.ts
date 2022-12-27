// FIRST CLASS DECORATOR, THIS IS AN EXAMPLE OF HOW CAN BE CREATED
// function Logger(
//   constructor: Function
// ) {
//   console.log('Logging', constructor)
// }

// THIS IS A DECORATOR FACTORY, YOU CREATE A DECORATOR AS BEFORE
// BUT YOU USE YOUR ARGUMENTS TO BE USED IN
// DECORATOR'S CONSTRUCTOR
function LoggerWithFactory(
  logString: string
) {
  return function(constructor: Function) {
    console.log('[Decorators]', logString, constructor)
  }
}

function WithTemplate(template: string | null, hookId: string) {
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
    // HERE WE CAN RETURN ORIGINAL'S CONSUTRCTOR WITH NEW FEATURES OR LOGIC
    return class extends originalConstructor {
      // YOU CAN USE '_' TO MENTION THAT YOU WILL NOT NEED THE ARGUMENT
      constructor(..._: any[]) {
        super()
        // HERE IS WHERE YOU ADD THE NEW LOGIC
        const htmlElement = document.getElementById(hookId)
        // IN THIS LINE YOU ARE USING THE PROPERTY NAME OF YOUR CONSTRUCTOR, WHICH IS THE CLASS YOU ARE
        // INSTANCIATING, SO YOU ARE SETTING THE INNERHTML WITH YOUR OBJECT/CLASS NAME VALUE
        htmlElement && (htmlElement.innerHTML = template ?? this.name)
      }
    }
  }
}

// 'PROPERTY DECORATOR'
// USED TO HANDLE LOGIC AT A PROPERTY LEVEL INSIDE A CLASS, YOU CAN
// ACCESS THE PROPERTY AND ITS CLASS CONSTRUCTOR USING THE FIRST PARAMETER
function PropertyLog(target: any, propertyName: string | Symbol) {
  console.log('[Decorators]', 'Property decorator', target, propertyName)
}

// 'SET DECORATOR'
// ITS FIRST PARAMETER IS RELATED TO THE CONSTRUCTOR OR INSTANCE
// ITS SECOND IS RELATED TO THE NAME OF THE SET
// AND ITS THIRD IS RELATED TO THE SET DESCRIPTION
function AccessorSetLog(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('[Decorators]', 'Accessor decorator', target, name, descriptor)
}

// 'METHOD DECORATOR'
// ITS FIRST PARAMETER IS RELATED TO THE CONSTRUCTOR OR INSTANCE
// ITS SECOND IS RELATED TO THE NAME OF THE METHOD
// AND ITS THIRD IS RELATED TO THE METHOD DESCRIPTION
function AccessorMethodLog(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('[Decorators]', 'Method decorator', target, name, descriptor)
}

// 'PARAMETER DECORATOR'
// ITS FIRST PARAMETER IS RELATED TO THE CONSTRUCTOR OR INSTANCE
// ITS SECOND IS RELATED TO THE NAME OF THE PARAMETER
// AND ITS THIRD IS RELATED TO THE PARAMETER INDEX IN THE METHOD WHERE IS USED
function AccessorParameterLog(target: any, name: string | Symbol, position: number) {
  console.log('[Decorators]', 'Parameter decorator', target, name, position)
}

// HERE YOU CAN CHAIN MULTIPLE DECORATORS, THOSE WILL BE EXECUTED BEFORE THE CLASS INSTANCE CRETATION
@LoggerWithFactory('LogString')
@WithTemplate(null, 'app-paragraph')
class Person {
  @PropertyLog
  name = 'Max'
  
  @AccessorSetLog
  set price(value: number) {
    if (value > 0) {
      this._price = value
    }
  }

  constructor(private _price: number = 10) {
    console.log('[Decorators]', 'Creating a new person...')
  }

  @AccessorMethodLog
  getPriceWithTax(@AccessorParameterLog tax: number = 10) {
    return this._price * (1 + tax)
  }
}

// A FUNCTION ACCESSOR DECORATOR
function AutoBind(_: any, __: string | Symbol, descriptor: PropertyDescriptor) {
  // HERE YOU HARE GETTING THE VALUE'S DESCRIPTOR, WHICH IS THE FUNCTION YOU ARE GOING TO BIND
  const originalMethod = descriptor.value
  // HERE YOU ARE CREATING A NEW DESCRIPTOR WHERE THE GET METHOD GIVES YOU THE SAME FUNCTION
  // NOW, THE GET'S RETURN WILL GIVE YOU A BINDED VERSION OF THE ORIGINAL METHOD, BUT
  // BINDED TO THE ORIGINAL OBJECT (THE CLASS INSTANCE), ISOLATING IT FROM OTHER LEXICAL CONTEXTS
  const customDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this)
    }
  }
  return customDescriptor
}

const _person = new Person()
console.warn('[Decorators]', _person)

class Printer {
  constructor(
    public message: string = 'This printer works!'
  ) {}

  @AutoBind
  showMessage() {
    console.warn('[Decorators]', this.message)
  }
}

const _printer = new Printer()
const button = document.getElementById('printer-button')
_printer.showMessage()
button?.addEventListener('click', _printer.showMessage)
// INSTEAD USING THE BIND FUNCTIONALITY, YOU CAN IMPLEMENT IT IN A DECORATOR
// button?.addEventListener('click', _printer.showMessage.bind(_printer))

// ---------------------------------------------
// VALIDATION LOGIC BASED ON DECORATORS
// ---------------------------------------------

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  // CLASSNAME = {}
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  // CLASSNAME = {}
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(_obj: any) {
  let isValid = true
  const objValidatorsConfig = registeredValidators[_obj.constructor.name]
  
  if (!objValidatorsConfig) {
    return true
  }

  for(const propName in objValidatorsConfig) {
    for (const propValidator of (objValidatorsConfig[propName] || [])) {
      switch (propValidator) {
        case 'required':
          isValid = isValid && !!_obj[propName]
        case 'positive':
          isValid = isValid && +_obj[propName] > 0
      }
    }
  }

  return isValid
}

class Course {
  @Required
  title: string
  @PositiveNumber
  price: number

  constructor(
    _title: string,
    _price: number
  ) {
    this.title = _title
    this.price = _price
  }
}

const courseForm = document.querySelector('form')
courseForm?.addEventListener('submit', event => {
  event.preventDefault()

  const titleElement = document.getElementById('title') as HTMLInputElement
  const priceElement = document.getElementById('price') as HTMLInputElement

  const createdCourse = new Course(titleElement.value, +priceElement.value)
  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!')
    return
  }
  console.warn('[Decorators]', createdCourse)
})