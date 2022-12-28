import React, { useState } from 'react'
// INTERFACES
import { Todo } from './interfaces/todo.model';
// COMPONENTS
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  // WHEN YOU USE A FUNCTION AS 'USESTATE', YOU CAN ADD THE TYPE OF DATA IT WILL BE USING
  const [todos, setTodos] = useState<Todo[]>([])

  const todoAddHandler = (text: string) => {
    // USING A FUNCTIONS IN A 'SETSTATE' IT WILL RETURN THE LAST POSSIBLE STATE ALWAYS
    setTodos(previousTodos => [...previousTodos, { id: Math.random(), text }])
  }

  const deleteHandler = (todoId: number) => {
    setTodos(previousTodos => previousTodos.filter(({ id }) => id !== todoId))
  }

  return (
    <>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList
        items={todos}
        onDeleteClick={deleteHandler}
      />
    </>
  );
}

export default App;
