import { useRef, useState } from "react";

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef("");
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(title) {
    title.preventDefault();
    const id = Date.now();
    onAddTodo({ workingTodoTitle, id });
    setWorkingTodoTitle("");
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        value={workingTodoTitle}
        id="todoTitle"
        name="title"
        placeholder="Please enter your text "
        ref={todoTitleInput}
        onChange={(event) => setWorkingTodoTitle(event.target.title.value)}
      />
      <button>Add Todo</button>
    </form>
  );
}
export default TodoForm;
