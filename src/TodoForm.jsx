import { useRef } from "react";

function TodoForm({ onAddTodo, }) {
  const todoTitleInput = useRef("")

  function handleAddTodo(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const id = Date.now()
    onAddTodo({title, id}); //This [id: Date.now] creates a uniq Id
    event.target.title.value = "";
    todoTitleInput.current.focus()
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        id="todoTitle"
        name="title"
        placeholder="Please enter your text "
        ref={todoTitleInput}
      />
      <button>Add Todo</button>
    </form>
  );
}
export default TodoForm;
