function TodoList() {
  const todos = [
    { id: 1, title: "learn react in 12 weeks" },
    { id: 2, title: "learn node in 13 weeks after react" },
    { id: 3, title: "learn typescript whiles learning react" },
  ];
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
