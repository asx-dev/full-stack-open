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

export default { getAll, createNote };