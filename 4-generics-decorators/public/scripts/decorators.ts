// FIRST CLASS DECORATOR, THIS IS AN EXAMPLE OF HOW CAN BE CREATED
// function Logger(
//   constructor: Function
// ) {
//   console.log('Logging', constructor)
// }

// THIS IS A DECORATOR FACTORY, YOU CREATE A DECORATOR AS BEFORE, BUT YOU USE YOUR ARGUMENTS TO BE USED IN
// DECORATOR'S CONSTRUCTOR
function LoggerWithFactory(
  logString: string
) {
  return function(constructor: Function) {
    console.log('[Decorators]', logString, constructor)
  }
}

function WithTemplate(template: string | null, hookId: string) {
  return function(constructor: any) {
    const htmlElement = document.getElementById(hookId)
    // IN THIS LINE YOU ARE USING THE PROPERTY NAME OF YOUR CONSTRUCTOR, WHICH IS THE CLASS YOU ARE
    // INSTANCIATING, SO YOU ARE SETTING THE INNERHTML WITH YOUR OBJECT/CLASS NAME VALUE
    htmlElement && (htmlElement.innerHTML = template ?? (new constructor()).name)
  }
}

// HERE YOU CAN CHAIN MULTIPLE DECORATORS, THOSE WILL BE EXECUTED BEFORE THE CLASS INSTANCE CRETATION
@LoggerWithFactory('LogString')
@WithTemplate(null, 'app-paragraph')
class Person {
  name = 'Max'
  
  constructor() {
    console.log('[Decorators]', 'Creating a new person...')
  }
}

const pers = new Person()

console.warn(pers)