// DRAG & DROP INTERFACES
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
  }
  
  export interface DragTarget {
    dragOverHandler(event: DragEvent): void // YOU ARE DRAGGING A VALID DRAGTARGET
    dropHandler(event: DragEvent): void // YOU ARE HANDLING THE DROP, UPDATING THE DATA
    dragLeaveHandler(event: DragEvent): void // GIVES VISUAL FEEDBACK WHEN YOU STOP DRAGGING THE ELEMENT
  }
}