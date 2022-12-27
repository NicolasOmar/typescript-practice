// MODELS & INTERFACES
import { Project, ProjectStatus } from "../models/models"

// THE TYPE OF STATE IN T WILL SET WHICH KIND OF DATA WILL BE STORED IN THE LISTENER CLASS
type Listener<T> = (items: T[]) => void

class State<T> {
  // PROTECTED CAN ONLY BE ACCESED FROM A INHERITED CLASS, NOT FROM OUTSIDE
  protected listeners: Listener<T>[] = []

  public addListener(listenerFn: Listener<T>) {
    this.listeners = [...this.listeners, listenerFn]
  }
}

// PROJECT STATE MANAGEMENT CLASS
class ProjectState extends State<Project> {
  // THE LIST OF CREATED PROJECTS
  private projects: Project[] = []
  // USING A SINGLETON PATTERN, YOU CREATE A STATIC PROPERTY CALLED INSTANCE
  private static instance: ProjectState

  private constructor() {
    super()
  }

  // IN METHOD GETINSTANCE YOU ARE ASKING FOR THE ONLY CREATED INSTANCE OF PROJECT STATE
  // IN CASE IS NOT CREATED, THE METHOD CREATED SUCH INSTANCE, OTHERWISE, IT RETURNS THE CREATED ONE
  static getInstance(): ProjectState {
    if (this.instance) {
      return this.instance
    }

    this.instance = new ProjectState()
    return this.instance
  }

  addProject(
    title: string,
    description: string,
    people: number
  ) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    )
    this.projects = [...this.projects, newProject]
    this.updateListeners()
  }

  // METHOD TO CHANGE PROJECT'S STATUS
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const _project = this.projects.find(_project => _project.id === projectId)
    // THIS IF IS USED TO AVOID UNNECESARY RENDERING WHEN YOU ARE MOVING THE MENTIONED PROJECT
    if (_project && _project.status !== newStatus) {
      _project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners() {
    // ONCE THE PROJECT HAVE BEEN ADDED TO THE ARRAY, IT WILL GIVE THE LISTENERS THE UPDATED ARRAY
    for (const listenerFn of this.listeners) {
      listenerFn([...this.projects])
    }
  }
}

// AT SYSTEM START, YOU CREATE THE PROJECTSTATE INSTANCE TO HAVE ONLY ONE (AT GLOBAL LEVEL, SO TO SPEAK)
export const globalProjectState = ProjectState.getInstance()