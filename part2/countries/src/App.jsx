import { useState } from "react";
function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/name/";

  const fetchCountryData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}${country}`);
      const data = await response.json();
      setCountries([data]);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
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
        <input type="submit" value="submit" />
      </form>

      {/* Many matches */}
      {countries.length > 10 && (
        <p>Too many matches, please be more specific.</p>
      )}

      {/*Between 1 & 10 */}
      {countries.length > 1 &&
        countries.length < 10 &&
        countries.map((country) => {
          return <li key={country.name.common}>{country.name.common}</li>;
        })}

      {countries.length === 1 && countries[0].name && (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>
          <h3>Languages</h3>
          {Object.entries(countries[0].languages).map((language) => {
            return <li key={language[0]}>{language[1]}</li>;
          })}
          <span style={{ fontSize: "250px" }}>{countries[0].flag}</span>
        </div>
      )}
    </>
  );
}

export default App;
