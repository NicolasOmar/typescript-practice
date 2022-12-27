// COMPONENTS
import { Component } from "./base-component.js"
// MODELS & INTERFACES
import { Project } from "../models/models.js"
import { Draggable } from "../models/interfaces.js"
// DECORATORS
import { AutoBind } from "../decorators/autobind.js"

// YOU CAN USE REFERENCE AND NAMESPACES TO LINK DEPENDENCIES IN EACH FILE, BUT IS PRONE TO ERRORS WITHOUT
// A PROPER REFERENCE OF WHICH FILE/FEATURE IS MISSING IN WHICH FILE
// /// <reference path="base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../models/models.ts" />
// /// <reference path="../models/interfaces.ts" />

// TO RENDER A SINGLE PROJECT ITEM
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project

  // INSTEAD PARSING this.project.people IN A METHOD, WE CAN USE A GETTER
  get persons() {
    const _people = this.project.people
    return `${_people} ${_people === 1 ? 'person' : 'persons'}`
  }

  constructor(
    hostId: string,
    _project: Project
  ) {
    super('single-project', hostId, false, _project.id)
    this.project = _project

    this.configure()
    this.renderContent()
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragleave', this.dragEndHandler)
  }

  renderContent(): void {
    // '!' MEANS THAT THE OBJECT OR REFERENCE BEFORE WILL NEVER BE NULL
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = `${this.persons} assigned`
    this.element.querySelector('p')!.textContent = this.project.description
  }

  @AutoBind
  dragStartHandler(event: DragEvent): void {
    // YOU ARE DRAGGING THE ID, TO USE WHEN YOU WANT TO GET THE OBJECT FROM ONE LIST AND SEND IT TO THE OTHER
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  @AutoBind
  dragEndHandler(_: DragEvent): void { }
}