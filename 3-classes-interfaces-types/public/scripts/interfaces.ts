// AN INTERFACE DESCRIBE A OBJECT'S STRUCTURE
// ITS NAME START CAPITALIZED AS A CONVENTION
interface Person {
  name: string
  age: number

  greet(greeting: string): void
}

let _userOne: Person
_userOne = {
  name: 'First user',
  age: 100,
  greet: (greeting) => console.log('[Interfaces]', greeting)
}

_userOne.greet('Hello there new user')

// THIS INTERFACE CAN BE INHERITADED IN ANOTHER ONE USING EXTENDS KEYWORD
interface Named {
  // AN INTERFACE PROPERTY CAN BE READONLY, BUT NOT PUBLIC, PRIVATE NOR PROTECTED
  readonly name: string
  // THE '?' MEANS IS A OPTIONAL PROPERTY
  lastname?: string
}
// CUSTOM TYPES CAN USE UNION TYPES, NOT IN INTERFACES
// YOU CAN IMPLEMENT AN INTERFACES IN A CLASS
// IT SEEMS SIMILAR TO AN ABSTRACT CLASS , BUT AN INTERFACE
// DOESN'T HAVE ANY IMPLEMENTATION DETAIL, IT WORKS MORE LIKE A CONTRACT
interface Greetable extends Named {
  greet(greeting: string): void
}

class GreetablePerson implements Greetable {
  name: string
  constructor(_name: string) {
    this.name = _name
  }

  greet(greeting: string): void {
    console.warn('[Interfaces]', `${greeting} ${this.name}`)
  }
}

const _personOne = new GreetablePerson('Test Person')
console.log('[Interfaces]', _personOne)
_personOne.greet('Hello there')