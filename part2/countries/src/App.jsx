import { useState } from "react";
function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const fetchCountryData = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
    );
    const data = await response.json();
    setCountries(data);
  };

  const inputHandler = (e) => {
    setCountry(e.target.value);
  };

  return (
    <>
      <h1>Countries</h1>
      <form onSubmit={fetchCountryData} method="get">
        Find country:{" "}
        <input type="text" value={country} onChange={inputHandler} />
      </form>
      {countries.length > 0 && countries.length < 10 ? (
        <ul>
          {countries.map((country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      ) : (
        "Too many matches, specify another filter."
      )}
    </>
  );
}

export default App;
