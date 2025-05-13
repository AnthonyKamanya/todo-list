function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  function preventRefresh(event) {
    event.preventDefault();
  }
  function resetSearchInput() {
    setQueryString("");
  }
  return (
    <form className="form" onSubmit={preventRefresh}>
      <div>
        <label>Search todos:</label>
        <input
          type="text"
          value={queryString}
          onChange={(event) => {
            setQueryString(event.target.value);
          }}
        />
        <button type="button" onClick={resetSearchInput}>
          Clear
        </button>
      </div>
      <div>
        <label className="sort by">Sort by</label>
        <select
          value={sortField}
          onChange={(event) => {
            setSortField(event.target.value);
          }}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
        {/* TODO:To fix this issue, nest the <input> in the <label>
        or provide a for attribute on the <label> that matches a form field id. */}
        <label className="direction">Direction</label>
        <select
          value={sortDirection}
          onChange={(event) => {
            setSortDirection(event.target.value);
          }}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
    </form>
  );
}
export default TodosViewForm;
