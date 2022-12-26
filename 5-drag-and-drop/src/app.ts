enum ProjectStatus {
  Active,
  Finished
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

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
  private projects: any[] = []
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
    // ONCE THE PROJECT HAVE BEEN ADDED TO THE ARRAY, IT WILL GIVE THE LISTENERS THE UPDATED
    // ARRAY
    for (const listenerFn of this.listeners) {
      listenerFn([...this.projects])
    }
  }
}

// AT SYSTEM START, YOU CREATE THE PROJECTSTATE INSTANCE TO HAVE ONLY ONE (AT GLOBAL LEVEL, SO TO SPEAK)
const globalProjectState = ProjectState.getInstance()

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

// COMPONENT BASE CLASS
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  // THIS PROP IS FOR HTML TEMPLATE
  templateElement: HTMLTemplateElement
  // THIS PROP IS FOR THE PLACE WHERE WE ARE GOING TO PUT THE HTML WE WANT
  hostElement: T
  // THIS PROP IS FOR SELECT THE HTML ELEMENT WE WANT TO MOVE FROM THE TEMPLATE TO THE HOST
  element: U

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string // YOU CAN USE THE '?' OR ADD A '| undefined' TO ASSIGN POSSIBLE NULL AS A VALUE
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
    this.hostElement = document.getElementById(hostElementId)! as T

    // HERE YOU ARE GETTING THE TEMPLATE HTML, IMPORTING A DEEP COPY OF THAT NODE/HTMLFRAGMENT
    const importedNode = document.importNode(this.templateElement.content, true)
    // YOU INSTANTIATE THE FIRST CHILD OF THAT IMPORTED NODE HAS A FORM ELEMENT (YOU KNOW IT WILL BE)
    this.element = importedNode.firstElementChild as U
    newElementId && (this.element.id = newElementId)
    this.attach(insertAtStart)
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'beforebegin' : 'afterbegin', this.element)
  }

  // NO IMPLEMENTATION HERE, BUT IT WILL BE NECESSARY ON CLASSES EXTENDED FROM THIS ONE
  // AN ABSTRACT CLASS CAN ONLY BE PUBLIC
  abstract configure(): void
  abstract renderContent(): void
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
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
    globalProjectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter(_project => _project.status === ProjectStatus.Active)
      this.renderProjects()
    })
    this.renderContent()
  }

  renderContent(): void {
    this.element.querySelector('ul')!.id = `${this.type}-projects-list`
    this.element.querySelector('h2')!.textContent = `${this.type.toLocaleUpperCase()} PROJECTS`
  }

  renderProjects() {
    const listElem = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    listElem.innerHTML = ''
    for (const projectItem of this.assignedProjects) {
      const listItem = document.createElement('li')
      listItem.textContent = projectItem.title
      listElem.appendChild(listItem)
    }
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  renderContent(): void {}

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

const newProjectForm = new ProjectInput()
const activeProjectList = new ProjectList('active')
const finishedProjectList = new ProjectList('finished')