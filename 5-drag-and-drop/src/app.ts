// INTERFACES
interface Validatable {
  value: string | number,
  required?: boolean // QUESTION MARK PERMITS NULL VALUES
  minLenght?: number
  maxLenght?: number
  min?: number
  max?: number
}

function validate(validatableInput: Validatable): boolean {
  let isValid: boolean = true

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toLocaleString().trim().length != 0
  }
  if (validatableInput.minLenght != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length > validatableInput.minLenght
  }
  if (validatableInput.maxLenght != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length < validatableInput.maxLenght
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value > validatableInput.min
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value < validatableInput.max
  }

  return isValid
}

// AUTOBIND DECORATOR
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

class ProjectInput {
  // THIS PROP IS FOR HTML TEMPLATE
  templateElement: HTMLTemplateElement
  // THIS PROP IS FOR THE PLACE WHERE WE ARE GOING TO PUT THE HTML WE WANT
  hostElement: HTMLDivElement
  // THIS PROP IS FOR SELECT THE HTML ELEMENT WE WANT TO MOVE FROM THE TEMPLATE TO THE HOST
  element: HTMLFormElement
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement
    this.hostElement = document.getElementById('app')! as HTMLDivElement

    // HERE YOU ARE GETTING THE TEMPLATE HTML, IMPORTING A DEEP COPY OF THAT NODE/HTMLFRAGMENT
    const importedNode = document.importNode(this.templateElement.content, true)
    // YOU INSTANTIATE THE FIRST CHILD OF THAT IMPORTED NODE HAS A FORM ELEMENT (YOU KNOW IT WILL BE)
    this.element = importedNode.firstElementChild as HTMLFormElement
    this.element.id = 'user-input'
    // YOU GET THE FORM INPUTS
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
    //
    this.configure()
    // CALL THE ATTACH METHOD TO MERGE/INSERT YOUR FORM FRAGMENT TO THE HOST
    this.attach()
  }

  // USE A TUPLE RETURN TYPE AND A UNION TYPE TO RETURN A SPECIFIC ARRAY OF VALUES OR NOTHING
  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value
    const description = this.descriptionInputElement.value
    const people = this.peopleInputElement.value

    const titleValidator: Validatable = {
      value: title,
      required: true
    }
    const descriptionValidator: Validatable = {
      value: description,
      required: true
    }
    const peopleValidator: Validatable = {
      value: people,
      required: true,
      min: 0
    }

    if(
      validate(titleValidator) &&
      validate(descriptionValidator) &&
      validate(peopleValidator)
    ) {
      return [title, description, +people]
    } else {
      alert('Invalid inputs, please try again')
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  // THE FORM HANDLER METHOD TO BE BINDED WITH FORM'S EVENT LISTENER
  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInputs = this.gatherUserInput()
    
    if (Array.isArray(userInputs)) {
      console.warn('[Drag and Drop]', userInputs)
      this.clearInputs()
    }
  }

  // MANTAIN CONCERN SEPARATION
  private configure() {
    // YOU ARE BINDING THE SUBMITHANDLER IN ORDER TO FIX THE LEXICAL ENVIROMENT/SCOPE INSIDE THE METHOD
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    // HERE YOU ARE INSERTING AN HTML ELEMENT AFTER YOU RENDER YOUR HTML OPENING TAG
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const newProjectForm = new ProjectInput()