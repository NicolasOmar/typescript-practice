// AUTOBIND DECORATOR
export function AutoBind(_: any, __: string | Symbol, descriptor: PropertyDescriptor) {
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