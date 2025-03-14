import "./App.css";

function App() {
  const todos = [
    { id: 1, title: "learn react in 12 weeks" },
    { id: 2, title: "learn node in 13 weeks after react" },
    { id: 3, title: "learn typescript whiles learning react" },
  ];
  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
