import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import noteService from "./services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const persons = await noteService.getAll();
        setPersons(persons);
      } catch (error) {
        console.error("Failed to fetch data", error);
        throw error;
      }
    };
    fetchData();
  }, []);

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

    // Send users to the server
    const createUser = async () => {
      try {
        const data = { name: newName, number: newNumber };
        const newUser = await noteService.createNote(data);
        setPersons(persons.concat(newUser));
      } catch (error) {
        console.log("Failed to create user", error);
        throw error;
      }
    };

    createUser();

    // Reset form
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
