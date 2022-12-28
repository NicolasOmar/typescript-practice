import React from "react"

interface TodoListProps {
  items: { id: string | number, text: string }[]
}

// YOU CREATE A REACT FUNCTIONAL COMPONENT, WHICH CAN HOLA A SPECIFIC TYPE
// OR INTERFACE (IT IS LIKE A PROPTYPE OBJECT)
const TodoList: React.FC<TodoListProps> = ({
  items = []
}) => {
  return (
    <ul>
      {
        items.map(
          _item => <li key={_item.id}>{_item.text}</li>
        )
      }
    </ul>
  )
}

export default TodoList