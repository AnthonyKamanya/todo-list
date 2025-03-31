function TodoForm() {
  return (
    <form /*onSubmit={(event) => onsubmit(event)} this is a button submit action*/
    >
      <label htmlFor="todoTitle">Todo</label>
      <input id="todoTitle" placeholder="Please add your todo's" />
      <button
        onClick={(event) => {
          event.preventDefault();
          console.log("How to make buttons click");
        }}
      >
        Add Todo
      </button>
    </form>
  );
}
export default TodoForm;
