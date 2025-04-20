function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <li id={todo.id}>
      <form>{todo.title}</form>
    </li>
  );
}
export default TodoListItem;
