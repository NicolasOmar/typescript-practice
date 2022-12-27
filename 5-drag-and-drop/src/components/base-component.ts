// COMPONENT BASE CLASS
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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