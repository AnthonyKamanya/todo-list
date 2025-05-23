import { useEffect, useState } from "react";

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setLocalQueryString]);

  function preventRefresh(event) {
    event.preventDefault();
  }
  function resetSearchInput() {
    setLocalQueryString("");
  }
  return (
    <form id="id" className="form" onSubmit={preventRefresh}>
      <div>
        <label>Search todos:</label>
        <input
          type="text"
          value={localQueryString}
          onChange={(event) => {
            setLocalQueryString(event.target.value);
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
