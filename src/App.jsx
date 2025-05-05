import "./App.css";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm.jsx";
import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading({ isLoading: true });
      const options = { method: "GET", headers: { Authorization: token } };
      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const { records } = await resp.json();
        const fetchedTodos = records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList([...fetchedTodos]);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);
  async function handleAddTodo(title) {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving({ isSaving: true });
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      const savedTodo = { id: records.id, ...records.fields };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }
  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList([...updatedTodos]);
  }
  async function handleUpdateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    const originalTodo = todoList.find((todo) => todo.id === editedTodo);
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      const { records } = await resp.json();
      const updatedTodo = { id: records[0]["id"], ...records.fields };
      if (!records[0].fields.isCompleted) {
        updatedTodo.isCompleted = false;
      }
      const updateTodos = todoList.map((todo) =>
        todo.id === updateTodos.id ? { ...updatedTodo } : todo
      );
      setTodoList([...updateTodos]);
    } catch (error) {
      setErrorMessage(`${error.message}.Reverting todo...`);
      const revertedTodos = setTodoList(
        updatedTodos.map((todo) =>
          todo.id === id ? { ...originalTodo } : todo
        )
      );
      setTodoList([...revertedTodos ]);
    } finally {
      setIsSaving(false);
    }
    setTodoList([...updatedTodos]);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todoList={todoList}
        isLoading={isLoading}
        onCompleteTodo={completeTodo}
        onUpdateTodo={handleUpdateTodo}
      />
      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}
    </div>
  );
}
export default App;
