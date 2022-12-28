export interface NewTodoInterface {
  onAddTodo: (todoText: string) => void
}

export interface Todo {
  id: string | number,
  text: string
}