// COMPONENTS
import { ProjectInput } from "./components/project-input.js"
import { ProjectList } from "./components/project-list.js"

// YOU CAN USE REFERENCE AND NAMESPACES TO LINK DEPENDENCIES IN EACH FILE, BUT IS PRONE TO ERRORS WITHOUT
// A PROPER REFERENCE OF WHICH FILE/FEATURE IS MISSING IN WHICH FILE
// /// <reference path="components/project-list.ts" />
// /// <reference path="components/project-input.ts" />

new ProjectInput()
new ProjectList('active')
new ProjectList('finished')