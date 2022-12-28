import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

function App() {
  // I USE THAT ARRAY DATA CREATION TO MAKE IT EASIER
  const items = new Array(10).fill(null).map((_, i) => ({ id: i, text: `Item N°${++i}` }))

  const todoAddHandler = (text: string) => {
    console.warn(text)
  }
  return (
    <>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList 
        items={items}
      />
    </>
  );
}

export default App;
