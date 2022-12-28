import { RequestHandler } from "express"
// MODELS
import { Todo } from "../models/todo.models"

let TODOS: Todo[] = []
const findTodo = (todoId: string): boolean => {
  return !!(TODOS.find(({ id }) => id === todoId))
}

// 'REQUESTHANDLER' IS USED TO KNOW THE FUNCTION WILL USE A COMMON NODE REQUEST FUNCTION
// WITH A REQUEST, RESPONSE, NEXT FUNCTION AND ITS ERRORS
export const createTodo: RequestHandler = (request, response, next) => {
  const text = (request.body as { text: string }).text
  const newTodo: Todo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)

  response
    .status(201)
    .json({ message: 'New todo created', data: newTodo })
}

export const getTodos: RequestHandler = (request, response, next) => (
  response.status(200).json({ todos: TODOS })
)

export const updateTodo: RequestHandler<{ id: string }> = (request, response, next) => {
  const todoId = request.params.id
  const updatedText = (request.body as { text: string}).text

  if (!findTodo(todoId)) {
    throw new Error('Todo not found with that id')
  }

  TODOS = TODOS.map(_todo => _todo.id === todoId ? { ..._todo, text: updatedText } : _todo)
  response.status(200).json({ message: 'Todo updated', todo: updatedText })
}

export const deleteTodo: RequestHandler<{ id: string }> = (request, response, next) => {
  const todoId = request.params.id

  if (!findTodo(todoId)) {
    throw new Error('Todo not found with that id')
  }

  TODOS = TODOS.filter(({ id }) => id !== todoId)
  response.status(200).json({ message: 'Todo deleted', todo: todoId })
}