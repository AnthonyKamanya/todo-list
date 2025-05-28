import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

const StyledTodoForm = styled.div`
  display: flex;
  flex-direction: row;
  background-color: whitesmoke;
  border-color: green;
  padding: 0.5rem;
  :disabled {
    font-style: italic;
  }
`;

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
    <StyledTodoForm>
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
    </StyledTodoForm>
  );
}
export default TodoForm;
