function TodoListItem({ todo }) {
  return (
    <>
      <li>
        {" "}
        {todo.title} || {todo.startDate}
      </li>
    </>
  );
}
export default TodoListItem;
