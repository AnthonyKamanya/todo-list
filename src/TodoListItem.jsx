function TodoListItem({ todo, onCompleteTodo }) {
  function handleChange(){
    onCompleteTodo(todo.id)
  }
  return (
    <li id={todo.id}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={handleChange}
      />
      <form>{todo.title}</form>
    </li>
  );
}
export default TodoListItem;
