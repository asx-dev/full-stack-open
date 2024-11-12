import { useState, useEffect } from "react";
function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState("");
  const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [filteredCountries, setFilteredCountries] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  const countrySearch = (e) => {
    e.preventDefault();

    const regex = new RegExp(country, "i");
    setFilteredCountries(
      countries.filter((country) => regex.test(country.name.common))
    );

    // Clear the input fields
    setCountry("");
    setWeatherData("");
  };

  const inputHandler = (e) => {
    setCountry(e.target.value);
  };

  const fetchWeatherData = async (name) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
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

  useEffect(() => {
    if (filteredCountries.length === 1)
      fetchWeatherData(filteredCountries[0].name.common);
  }, [filteredCountries]);

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
          {weatherData && (
            <div>
              <h1>Weather in {filteredCountries[0].name.common}</h1>
              <p>Temperature {weatherData.main.temp.toFixed(2)}ºC</p>
              <p>Wind {weatherData.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
