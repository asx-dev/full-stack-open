import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const nameHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const searchValueHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName))
      return window.alert(`${newName} is already added to the phonebook`);

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const filterHandler = (e) => {
    e.preventDefault();
    if (searchValue.length === 0)
      return window.alert("Please introduce a valid search value");
    setPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={filterHandler}>
        Filter:
        <input type="text" value={searchValue} onChange={searchValueHandler} />
        <button type="submit">search</button>
      </form>
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
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
