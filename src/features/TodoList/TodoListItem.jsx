import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem({ todo, onCompleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleChange() {
    onCompleteTodo(todo.id);
  }

  function handleCancel() {
    workingTitle = todo.title;
    setIsEditing(false);
  }

  function handleEdit(){}
  return (
    <li id={todo.id}>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel value={todo.title} />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                id={`checkbox${todo.id}`}
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>

            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}
export default TodoListItem;
