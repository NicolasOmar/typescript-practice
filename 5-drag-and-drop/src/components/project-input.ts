// COMPONENTS
import { Component } from "./base-component"
// MODELS & INTERFACES
import { globalProjectState } from "../state/project-state"
// DECORATORS
import { AutoBind } from "../decorators/autobind"
import { Validatable, validate } from "../utils/validation"

// YOU CAN USE REFERENCE AND NAMESPACES TO LINK DEPENDENCIES IN EACH FILE, BUT IS PRONE TO ERRORS WITHOUT
// A PROPER REFERENCE OF WHICH FILE/FEATURE IS MISSING IN WHICH FILE
// /// <reference path="base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement
    this.hostElement = document.getElementById('app')! as HTMLDivElement

    // YOU GET THE FORM INPUTS
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
    // HERE YOU ARE SETTING THE FORM EVENT LISTENER WITH THE SUBMIT HANDLER METHOD
    this.configure()
  }

  // THE FORM HANDLER METHOD TO BE BINDED WITH FORM'S EVENT LISTENER
  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInputs = this.gatherUserInput()

    if (Array.isArray(userInputs)) {
      // USING A SPREAD OPERATOR, YOU ARE SENDING THE INPUTS ARRAY AS A LIST OF PARAMETERS
      // INSIDE THE ADDPROJECT METHOD
      globalProjectState.addProject(...userInputs)
      this.clearInputs()
    }
  }

  // THOSE FUNCTIONS ARE HERE TO MANTAIN CONCERN SEPARATION
  // ANY ABSTRACT METHODS SHOULD BE PUBLIC IN IMPLEMENTED CLASSES AS WELL
  configure() {
    // YOU ARE BINDING THE SUBMITHANDLER IN ORDER TO FIX THE LEXICAL ENVIROMENT/SCOPE INSIDE THE METHOD
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent(): void { }

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

    if (
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
}