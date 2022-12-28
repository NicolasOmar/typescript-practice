import React, { useRef } from "react"
// INTERFACES
import { NewTodoInterface } from "../interfaces/todo.model"

const NewTodo: React.FC<NewTodoInterface> = ({ onAddTodo }) => {
  // INSTEAD USING STATES (FOR THIS EXERCISE), I GET THE VALUE INFO BY USING 'USEREF'
  // ADDITIONAL TO THE REF, YOU CAN ASSIGN WHAT TYPE OF ELEMENT YOU ARE MAKING REFERENCE OF
  // ALSO, YOU ADD THE NULL VALUE TO INSTANTIATE THE INPUT (OR ELEMENT) VALUE TO NULL ONCE
  // THE COMPONENT RENDERS FOR FIRST TIME
  const todoFormInput = useRef<HTMLInputElement>(null)
  // FOR REACT ENVIRONMENT, YOU HAVE TO USE A 'REACT.FORMEVENT' TO HANDLE THAT DATA CORRECTLY
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    // THE '!' IS USED TO TELL TYPESCRIPT THIS VALUE IT WILL NEVER BE NULL
    onAddTodo(todoFormInput.current!.value)
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="todo-text">Todo Text</label>
      <input type="text" id="todo-text" ref={todoFormInput} />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default NewTodo