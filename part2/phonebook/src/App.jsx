import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const inputHandler = (e) => {
    setNewName(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName))
      return window.alert(`${newName} is already added to the phonebook`);
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formHandler}>
        <div>
          name: <input value={newName} onChange={inputHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.name}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
