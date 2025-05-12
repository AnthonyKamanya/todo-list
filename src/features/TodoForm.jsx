import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef("");
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(title) {
    title.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId={"todoTitle"}
        labelText="Todo"
        value={workingTodoTitle}
        ref={todoTitleInput}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />

      <button disabled={workingTodoTitle === ""}>
        {isSaving ? "Saving..." : "Add Todo"}
      </button>
    </form>
  );
}
export default TodoForm;
