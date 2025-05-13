import "./App.css";
import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm.jsx";
import { useEffect, useState } from "react";
import TodosViewForm from "./features/TodosViewForm.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");

  function encodeUrl({ sortField, sortDirection, queryString }) {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = "";
    if (searchQuery) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = { method: "GET", headers: { Authorization: token } };
      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );
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
  }, [sortField, sortDirection, queryString]);

  async function handleAddTodo(title) {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
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
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      const savedTodo = { id: records[0].id, ...records[0].fields };
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

  async function handleUpdateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList([...updatedTodos]);
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
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      const { records } = await resp.json();
      const updatedTodo = { id: records[0]["id"], ...records[0].fields };
      if (!records[0].fields.isCompleted) {
        updatedTodo.isCompleted = false;
      }
    } catch (error) {
      setErrorMessage(`${error.message}.Reverting todo...`);
      const revertedTodos = setTodoList(
        updatedTodos.map((todo) =>
          todo.id === originalTodo.id ? { ...originalTodo } : todo
        )
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList([...updatedTodos]);

    const completedTodos = updatedTodos.find((todo) => todo.id === id);
    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: completedTodos.title,
            isCompleted: completedTodos.isCompleted,
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
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, searchQuery }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      const { records } = await resp.json();
      const updatedTodo = { id: records[0]["id"], ...records[0].fields };
      if (!records[0].fields.isCompleted) {
        updatedTodo.isCompleted = false;
      }
    } catch (error) {
      setErrorMessage(`${error.message}.  Reverting todo...`);
      const revertedTodos = todoList.map((todo) =>
        todo.id === id ? { ...originalTodo } : todo
      );

      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm isSaving={isSaving} onAddTodo={handleAddTodo} />
      <TodoList
        todoList={todoList}
        isLoading={isLoading}
        onCompleteTodo={completeTodo}
        onUpdateTodo={handleUpdateTodo}
      />
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
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
