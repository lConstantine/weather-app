import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
// import Input from './components/Input'
// import Output from "./components/Output";

const Pagination = ({ forecastsPerPage, totalForecasts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalForecasts / forecastsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Now = ({ weather, convertTimestamp, windDirection, setDisplay }) => {
  return (
    <div>
      {weather && (
        <div>
          <button
            onClick={(e) => {
              setDisplay("forecast");
            }}
          >
            Show Weather Forecast
          </button>
          <br />
          <br />
          Weather in {weather.name}, {weather.sys.country} now:
          <br />
          <br />
          <h1>{weather.weather[0].main}</h1>
          <h6>{weather.weather[0].description}</h6>
          <br />
          <p>{`Temperature: ${weather.main.temp} °C`}</p>
          <p>{`Wind: ${windDirection(
            weather.wind.deg
          )} ${weather.wind.speed.toFixed(1)} m/s`}</p>
          <p>{`Feels like: ${weather.main.feels_like} °C`}</p>
          <p>{`Atm pressure: ${weather.main.pressure}`}</p>
          <p>{`Humidity: ${weather.main.humidity}%`}</p>
          <p>
            {`Sunrise at: ${convertTimestamp(weather.sys.sunrise)
              .split(",")
              .shift()}`}
            <br />
            {`Sunset at: ${convertTimestamp(weather.sys.sunset)
              .split(",")
              .shift()}`}
          </p>
          <p>{`Visibility: ${weather.visibility} m`}</p>
        </div>
      )}
    </div>
  );
};

const Forecast = ({
  weather,
  forecast,
  convertTimestamp,
  windDirection,
  setDisplay,
  forecastsPerPage,
  totalForecasts,
  paginate,
}) => {

  return (
    <div>
      {forecast && (
        <div>
          <button
            onClick={(e) => {
              setDisplay("now");
            }}
          >
            Show Weather Now
          </button>
          <br />
          <br />
          Weather forecast in {weather.name}, {weather.sys.country} at:
          <br />
          <br />
          <ul>
            {forecast.map((it, idx) => (
              <li key={idx + 1}>
                {convertTimestamp(it.dt)}
                <br />
                <br />
                <h1>{it.weather[0].main}</h1>
                <h6>{it.weather[0].description}</h6>
                <br />
                <p>{`Temperature: ${it.main.temp} °C`}</p>
                <p>{`Wind: ${windDirection(
                  it.wind.deg
                )} ${it.wind.speed.toFixed(1)} m/s`}</p>
                <p>{`Feels like: ${it.main.feels_like.toFixed(1)} °C`}</p>
                <p>{`Atm pressure: ${(it.main.pressure / 1.333).toFixed(
                  2
                )} mm Hg`}</p>
                <p>{`Humidity: ${it.main.humidity}%`}</p>
                <p>{`Probability of precipitation: ${it.pop}%`}</p>
                <p>{`Visibility: ${
                  (it.visibility / 1000).toFixed(1) === 10.0
                    ? 10
                    : (it.visibility / 1000).toFixed(1)
                } km`}</p>
                <br />
              </li>
            ))}
          </ul>
        </div>
      )}
      <Pagination
        forecastsPerPage={forecastsPerPage}
        totalForecasts={totalForecasts}
        paginate={paginate}
      />
    </div>
  );
};

const Output = ({
  weather,
  forecast,
  loading,
  forecastsPerPage,
  totalForecasts,
  paginate,
}) => {
  const [display, setDisplay] = useState("now");

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const convertTimestamp = (timestamp) => {
    let d = new Date(timestamp * 1000); // Convert the passed timestamp to milliseconds
    let yyyy = d.getFullYear();
    let mm = ("0" + (d.getMonth() + 1)).slice(-2); // Months are zero based. Add leading 0.
    let dd = ("0" + d.getDate()).slice(-2); // Add leading 0.
    let hh = d.getHours();
    let h = hh;
    let min = ("0" + d.getMinutes()).slice(-2); // Add leading 0.
    let ampm = "AM";

    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh === 0) {
      h = 12;
    }


    let time = h + ":" + min + " " + ampm + ", " + dd + "-" + mm + "-" + yyyy;

    return time;
  };
  const windDirection = (degrees) => {
    degrees = parseFloat(degrees);
    if (degrees <= 11.25) return "N";
    degrees -= 11.25;
    let allDirections = [
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
      "N",
    ];
    let dIndex = parseInt(degrees / 22.5);
    return allDirections[dIndex];
  };

  return (
    <div>
      OUTPUT:{totalForecasts}
      {display === "now" && (
        <Now
          weather={weather}
          convertTimestamp={convertTimestamp}
          windDirection={windDirection}
          setDisplay={setDisplay}
        />
      )}
      {display === "forecast" && (
        <Forecast
          weather={weather}
          forecast={forecast}
          convertTimestamp={convertTimestamp}
          windDirection={windDirection}
          setDisplay={setDisplay}
          forecastsPerPage={forecastsPerPage}
          totalForecasts={totalForecasts}
          paginate={paginate}
        />
      )}
    </div>
  );
};

const Input = ({ setLocation }) => {
  const [city, setCity] = useState("");
  const onClick = () => {
    setLocation(city.trim());
    setCity("");
  };

  return (
    <div>
      <input
        onChange={(e) => setCity(e.target.value)}
        value={city}
        placeholder="Enter your city"
      />
      <button onClick={onClick}>Show</button>
    </div>
  );
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState("Moscow");
  const [loading, setLoading] = useState(false);

  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=144bb6c6c8c045fbb19524051d0be93a`;

  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=144bb6c6c8c045fbb19524051d0be93a`;
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios(urlWeather).then((resp) => setWeather(resp.data));
      await axios(urlForecast).then((resp) => setForecast(resp.data.list));
      setLoading(false);
    };
    fetchData();
  }, [location, urlWeather, urlForecast]);

  const [currentPage, setCurrentPage] = useState(1);
  const [forecastsPerPage] = useState(10);

  //Pagination

  const indexOfLastForecast = currentPage * forecastsPerPage;
  const indexOfFirstForecast = indexOfLastForecast - forecastsPerPage;
  const currentForecasts = forecast.slice(
    indexOfFirstForecast,
    indexOfLastForecast
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>Weather App:</div>
      <Input setLocation={setLocation} /> <br />
      <Output
        weather={weather}
        forecast={currentForecasts}
        loading={loading}
        forecastsPerPage={forecastsPerPage}
        totalForecasts={forecast.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App