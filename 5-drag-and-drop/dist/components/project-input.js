var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { globalProjectState } from "../state/project-state.js";
import { AutoBind } from "../decorators/autobind.js";
import { validate } from "../utils/validation.js";
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    submitHandler(event) {
        event.preventDefault();
        const userInputs = this.gatherUserInput();
        if (Array.isArray(userInputs)) {
            globalProjectState.addProject(...userInputs);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;
        const titleValidator = {
            value: title,
            required: true
        };
        const descriptionValidator = {
            value: description,
            required: true
        };
        const peopleValidator = {
            value: people,
            required: true,
            min: 0
        };
        if (validate(titleValidator) &&
            validate(descriptionValidator) &&
            validate(peopleValidator)) {
            return [title, description, +people];
        }
        else {
            alert('Invalid inputs, please try again');
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
