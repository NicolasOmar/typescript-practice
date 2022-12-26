/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/models.ts" />
/// <reference path="../models/interfaces.ts" />

namespace App {
  export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[]

    constructor(
      private type: 'active' | 'finished'
    ) {
      super('project-list', 'app', false, `${type}-projects`)
      this.assignedProjects = []
      this.configure()
      this.renderContent()
    }

    configure(): void {
      this.element.addEventListener('dragover', this.dragOverHandler)
      this.element.addEventListener('dragleave', this.dragLeaveHandler)
      this.element.addEventListener('drop', this.dropHandler)
      globalProjectState.addListener((projects: Project[]) => {
        this.assignedProjects = projects.filter(_project => {
          return this.type === 'active'
            ? _project.status === ProjectStatus.Active
            : _project.status === ProjectStatus.Finished
        })
        this.renderProjects()
      })
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        // YOU ARE PREVENT DEFAULT BEHAVIOR THAT BLOCKS THE USER TO DROP THE INFORMATION
        event.preventDefault()
        const listElem = this.element.querySelector('ul')!
        listElem.classList.add('droppable')
      }
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
      const projectId = event.dataTransfer!.getData('text/plain')
      globalProjectState.moveProject(
        projectId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      )
    }

    @AutoBind
    dragLeaveHandler(_: DragEvent): void {
      const listElem = this.element.querySelector('ul')!
      listElem.classList.remove('droppable')
    }

    renderContent(): void {
      this.element.querySelector('ul')!.id = `${this.type}-projects-list`
      this.element.querySelector('h2')!.textContent = `${this.type.toLocaleUpperCase()} PROJECTS`
    }

    renderProjects() {
      const listElem = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
      listElem.innerHTML = ''
      for (const projectItem of this.assignedProjects) {
        // INSTEAD CREATING A NEW ELEMENT MANUALLY, YOU INSTANTIATE IT IN A CLASS WHICH WILL RENDER THE ITEM
        new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        // const listItem = document.createElement('li')
        // listItem.textContent = projectItem.title
        // listElem.appendChild(listItem)
      }
    }
  }
}