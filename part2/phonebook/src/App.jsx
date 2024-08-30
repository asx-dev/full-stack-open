import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
      {/* Filter Form */}
      <Filter
        filterHandler={filterHandler}
        searchValue={searchValue}
        searchValueHandler={searchValueHandler}
      />
      {/* Add Contacts Form */}
      <PersonForm
        formHandler={formHandler}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />

      <h2>Numbers</h2>
      {/* List of peple */}
      <Persons persons={persons} />
    </div>
  );
};

export default App;
