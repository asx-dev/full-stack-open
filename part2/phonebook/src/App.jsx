import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import noteService from "./services/notes";
import Success from "./components/Success";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await noteService.getAll();
        setPersons(data);
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
    const data = { name: newName, number: newNumber };

    if (persons.some((person) => person.name === newName)) {
      window.alert(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      );

      const person = persons.find((person) => person.name === newName);

      const updateUser = async (id) => {
        try {
          const updatedUser = await noteService.updateNote(id, data);
          setPersons(
            persons.map((person) => (person.id === id ? updatedUser : person))
          );
          setMessage(`Updated ${newName}'s number`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        } catch (error) {
          setErrorMessage(error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      };
      updateUser(person.id, data);
    } else {
      // Send users to the server
      const createUser = async () => {
        try {
          const newUser = await noteService.createNote(data);
          setPersons(persons.concat(newUser));
          setMessage(`Added ${newName} to the phonebook`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        } catch (error) {
          setErrorMessage(error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      };

      createUser();
    }

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
      {message && <Success message={message} />}

      {errorMessage && <Error message={errorMessage} />}
      <Filter
        filterHandler={filterHandler}
        searchValue={searchValue}
        searchValueHandler={searchValueHandler}
      />

      <PersonForm
        formHandler={formHandler}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
