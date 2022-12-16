// GENERIC TYPES, IS CONNECTED TO SOME OTHER TYPE THAN WE WANT TO KNOW
const names: string[] = []
const genericNames: Array<string> = []

const genericPromise: Promise<string> = new Promise(
  (resolve) => setTimeout(() => resolve('Hello there'), 2000)
)
genericPromise.then(result => result.split(', '))

const merge = (objA: object, objB: object) => ({ ...objA, ...objB })
// HERE THE GENERICS WORK TO UNDERSTAND THAT THE MERGED OBJECT FROM THE FUNCTION
// WILL BE A INTERSECTION BETWEEN 2 OBJECTS, AND ITS PROPERTIES AND FUNCTIONS WILL
// BE ACCESIBLE EVEN WITHOUT KNOWING THEM BEFORE HAND
function genericMerge<T, U>(objA: T, objB: U) {
  return { ...objA, ...objB }
}

const mergedObject = merge({ name: 'test' }, { status: true })
const genericMergedObject = genericMerge({ name: 'test' }, { status: true })

// mergedObject.name // I CAN NOT GET THE PROPERTY 'NAME'
genericMergedObject.name // I CAN GET THE PROPERTY 'NAME'

interface Lengthy { length: number }
function conuntAndDescribe<T extends Lengthy>(element: T): [T, string] {
  const descriptionText =  element.length === 1
    ? 'Has 1 value'
    : element.length > 1
      ? `Has ${element.length} values`
      : 'Has no value'
  return [element, descriptionText]
}

console.warn('[Generics]', conuntAndDescribe(['Mathematics', 'History']))

// 'KEYOF' IS A KEYWORD USED TO TELL THAT A PARAMETER WILL BE A KEY OF OTHER PARAMETER
// IN THIS CASE, IS MENTIONING IT WILL BE A KEY OF AN OBJECT (HAVING THIS FUNCTION CASE)
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Key/property: ${key.toString()}, Value: ${obj[key]}`
}

console.warn('[Generics]', extractAndConvert({ name: 'test ' }, 'name'))

// GENERIC CLASSES
class DataStorage<T> {
  private data: T[] = []

  addItem(item: T) {
    this.data = [...this.data, item]
  }

  removeItem(item: T) {
    this.data = this.data.filter(_item => _item !== item)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('2') // IT WILL WORK BECASUES IS A 'STRING TYPE' VALUE
textStorage.addItem('test') // IT WILL WORK BECASUES IS A 'STRING TYPE' VALUE
textStorage.addItem('deletable') // IT WILL WORK BECASUES IS A 'STRING TYPE' VALUE
textStorage.removeItem('deletable') // IT WILL WORK BECASUES IS A 'STRING TYPE' VALUE
// textStorage.addItem(null) // IT WILL NOT WORK BECASUES IS NOT A 'STRING TYPE' VALUE
// textStorage.addItem({}) // IT WILL NOT WORK BECASUES IS NOT A 'STRING TYPE' VALUE

// YOU CAN ALSO USE A UNION TYPE AS 'T' TYPE
const multipleStorage = new DataStorage<number | string>()
multipleStorage.addItem('2') // IT WILL WORK BECASUES IS A 'STRING TYPE' VALUE
multipleStorage.addItem('test') // IT WILL WORK BECASUES IS A 'STRING TYPE' VALUE
multipleStorage.addItem(2) // IT WILL WORK BECASUES IS A 'NUMBER TYPE' VALUE
multipleStorage.addItem(0) // IT WILL WORK BECASUES IS A 'NUMBER TYPE' VALUE
multipleStorage.removeItem(0)


console.info('[Generics]', textStorage.getItems())
console.info('[Generics]', multipleStorage.getItems())