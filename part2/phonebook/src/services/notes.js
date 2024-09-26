import axios from "axios";

const API_URL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(API_URL);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

const createNote = (note) => {
  const request = axios.post(API_URL, note);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating note:", error);
      throw error;
    });
};

const deleteNote = (id) => {
  const request = axios.delete(`${API_URL}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting note:", error);
      throw error;
    });
};

const updateNote = (id, updatedNote) => {
  const request = axios.put(`${API_URL}/${id}`, updatedNote);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating note:", error);
      throw error;
    });
};

export default { getAll, createNote, deleteNote, updateNote };
