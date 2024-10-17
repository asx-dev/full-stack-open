import { useState, useEffect } from "react";
function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [response, setResponse] = useState("");
  const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/name/";

  const fetchCountryData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${country}`);
      const data = await response.json();
      setCountries([data]);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const inputHandler = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    if (countries.length > 10)
      setResponse(<p>{"Too many matches, specify another filter."}</p>);
    if (countries.length > 1 && countries.length < 10)
      setResponse(
        countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))
      );
    if (countries.length === 1) setResponse(countries[0]);
  }, [countries]);

  return (
    <>
      <h1>Countries</h1>
      <form onSubmit={fetchCountryData} method="get">
        Find country:{" "}
        <input type="text" value={country} onChange={inputHandler} />
        <input type="submit" value="submit" />
      </form>
      {response.length === 1 && (
        <>
          <h1>{response[0].name.common}</h1>
          <p>Capital:{response[0].capital[0]} </p>
          <p>Area: {response[0].area}</p>
          <h1>Languages</h1>
          {response[0].languages.map((item) => (
            <lik key={item}>{item}</lik>
          ))}
          {response[0].flag}
        </>
      )}
    </>
  );
}

export default App;
