import { useState, useEffect } from "react";
function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [filteredCountries, setFilteredCountries] = useState([]);

  const countrySearch = (e) => {
    e.preventDefault();

    const regex = new RegExp(country, "i");
    setFilteredCountries(
      countries.filter((country) => regex.test(country.name.common))
    );
  };

  const inputHandler = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    let mounted = true;

    const fetchCountryData = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        if (mounted) {
          setCountries(data);
        }
      } catch (error) {
        if (mounted) {
          console.error("Failed to fetch data", error);
        }
      }
    };

    fetchCountryData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <h1>Countries</h1>
      <form onSubmit={countrySearch} method="get">
        Find country:{" "}
        <input type="text" value={country} onChange={inputHandler} />
        <input type="submit" value="submit" />
      </form>

      {/* Many matches */}
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter.</p>
      )}
      {/*Between 1 & 10 */}
      {filteredCountries.length > 1 && filteredCountries.length < 10 && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setFilteredCountries([country])}>
                show
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Exact Match  */}
      {filteredCountries.length === 1 && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area:{filteredCountries[0].area}</p>
          <p>
            Languages:{" "}
            {Object.values(filteredCountries[0].languages).join(", ")}
          </p>
          <img src={filteredCountries[0].flags.png} />
        </div>
      )}
    </>
  );
}

export default App;
