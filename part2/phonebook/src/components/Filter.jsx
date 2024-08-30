const Filter = ({ filterHandler, searchValue, searchValueHandler }) => {
  return (
    <form onSubmit={filterHandler}>
      Filter:
      <input type="text" value={searchValue} onChange={searchValueHandler} />
      <button type="submit">search</button>
    </form>
  );
};

export default Filter;
