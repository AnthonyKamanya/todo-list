import "./App.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  function handleAddTodo(newTodo) {
    const title = event.target.title.value;
    newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }
  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList(updatedTodos)
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo}/>
    </div>
  );
}
export default App;
