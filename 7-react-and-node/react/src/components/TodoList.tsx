import React from "react"
// INTERFACES
import { Todo } from "../interfaces/todo.model"

interface TodoListProps {
  items: Todo[],
  onDeleteClick: (id: number) => void
}

// YOU CREATE A REACT FUNCTIONAL COMPONENT, WHICH CAN HOLA A SPECIFIC TYPE
// OR INTERFACE (IT IS LIKE A PROPTYPE OBJECT)
const TodoList: React.FC<TodoListProps> = ({
  items = [],
  onDeleteClick
}) => {
  return (
    <ul>
      {
        items.map(
          _item => (
            <li key={_item.id}>
              <span>{_item.text}</span>
              <button onClick={() => onDeleteClick(+_item.id)}>X</button>
            </li>
          )
        )
      }
    </ul>
  )
}

export default TodoList