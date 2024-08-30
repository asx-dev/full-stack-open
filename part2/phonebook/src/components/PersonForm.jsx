const PersonForm = ({
  formHandler,
  newName,
  nameHandler,
  newNumber,
  numberHandler,
}) => {
  return (
    <form onSubmit={formHandler}>
      <div>
        Name: <input value={newName} onChange={nameHandler} />
        <br />
        Number: <input value={newNumber} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
