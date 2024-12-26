import noteService from "../services/notes";
const Persons = ({ persons, setPersons }) => {
  const deletePerson = async (id) => {
    try {
      const target = persons.find((person) => person.id === id);
      if (window.confirm(`Delete ${target.name}?`)) {
        const contacts = await noteService.deleteNote(id);
        setPersons(contacts);
      }
    } catch (error) {
      console.log("Error deleting person", error);
      throw error;
    }
  };

  return (
    <>
      {persons.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

export default Persons;
