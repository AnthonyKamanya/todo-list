import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css'

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter(
    (checkedTodo) => !checkedTodo.isCompleted
  );

  return (
    <div className={styles.todoList}>
      {filteredTodoList.length === 0 ? (
        isLoading ? (
          <p>Todo list loading ...</p>
        ) : (
          <p>Add todo above to get started </p>
        )
      ) : (
        <ul className={styles.unorderedList}>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            >
              {todo}
            </TodoListItem>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
