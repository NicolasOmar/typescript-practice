import { Project, ProjectStatus } from "../models/models.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners = [...this.listeners, listenerFn];
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects = [...this.projects, newProject];
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const _project = this.projects.find(_project => _project.id === projectId);
        if (_project && _project.status !== newStatus) {
            _project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn([...this.projects]);
        }
    }
}
export const globalProjectState = ProjectState.getInstance();
