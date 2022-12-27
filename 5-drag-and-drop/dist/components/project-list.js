var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { ProjectItem } from "./project-item.js";
import { ProjectStatus } from "../models/models.js";
import { globalProjectState } from "../state/project-state.js";
import { AutoBind } from "../decorators/autobind.js";
export class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        globalProjectState.addListener((projects) => {
            this.assignedProjects = projects.filter(_project => {
                return this.type === 'active'
                    ? _project.status === ProjectStatus.Active
                    : _project.status === ProjectStatus.Finished;
            });
            this.renderProjects();
        });
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listElem = this.element.querySelector('ul');
            listElem.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData('text/plain');
        globalProjectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listElem = this.element.querySelector('ul');
        listElem.classList.remove('droppable');
    }
    renderContent() {
        this.element.querySelector('ul').id = `${this.type}-projects-list`;
        this.element.querySelector('h2').textContent = `${this.type.toLocaleUpperCase()} PROJECTS`;
    }
    renderProjects() {
        const listElem = document.getElementById(`${this.type}-projects-list`);
        listElem.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, projectItem);
        }
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeaveHandler", null);
