function TodoListItem({ todo, onCompleteTodo }) {
  function handleChange() {
    onCompleteTodo(todo.id);
  }
  return (
    <li id={todo.id}>
      <form>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleChange}
        />
        {todo.title}
      </form>
    </li>
  );
}
export default TodoListItem;
