import TodoListItem from "./TodoListItem";

function TodoList() {
  const todos = [
    { id: 1, title: "learn react in 12 weeks", startDate: "11-03-25" },
    {
      id: 2,
      title: "learn node in 13 weeks after react",
      startDate: "02-06-25",
    },
    {
      id: 3,
      title: "learn typescript whiles learning react",
      startDate: "18-03-25",
    },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} startDate={todo.startDate} />
      ))}
    </ul>
  );
}

export default TodoList;
