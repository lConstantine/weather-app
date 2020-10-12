import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const Output = ({ weather }) => {
  const convertTimestamp = (timestamp) => {
    let d = new Date(timestamp * 1000);
    let hh = d.getHours();
    let h = hh;
    let min = ("0" + d.getMinutes()).slice(-2);
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

    let time = h + ":" + min + " " + ampm;

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
    return allDirections[dIndex]
  };

  return (
    <div>
      {weather && (
        <div>
          Weather in {weather.name}, {weather.sys.country}:
          <h1>{weather.weather[0].main}</h1>
          <h6>{weather.weather[0].description}</h6>
          <br />
          <p>{`Temperature: ${weather.main.temp} °C`}</p>
          <p>{`Wind: ${windDirection(weather.wind.deg)} ${
            weather.wind.speed
          } m/s`}</p>
          <p>{`Feels like: ${weather.main.feels_like} °C`}</p>
          <p>{`Atm pressure: ${(weather.main.pressure / 1.333).toFixed(
            2
          )} mm Hg`}</p>
          <p>{`Humidity: ${weather.main.humidity}%`}</p>
          <p>
            {`Sunrise at: ${convertTimestamp(weather.sys.sunrise)}`}
            <br />
            {`Sunset at: ${convertTimestamp(weather.sys.sunset)}`}
          </p>
          <p>{`Visibility: ${
            (weather.visibility / 1000).toFixed(1) === 10.0
              ? 10
              : (weather.visibility / 1000).toFixed(1)
          } km`}</p>
        </div>
      )}
    </div>
  );
};

const Input = ({ setLocation }) => {
  const [city, setCity] = useState("");
  const onClick = () => {
    setLocation(city);
    setCity("");
  };

  return (
    <div>
      <input
        onChange={(e) => setCity(e.target.value)}
        value={city}
        placeholder="Enter your city"
      />
      <button onClick={onClick}>Submit</button>
    </div>
  );
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=144bb6c6c8c045fbb19524051d0be93a`;

  useEffect(() => {
    if (location.length !== 0) {
      axios(url).then((resp) => {
        setWeather(resp.data);
      });
    }
  }, [location, url]);

  return (
    <div>
      <div>Weather App:</div>
      <Input setLocation={setLocation} /> <br />
      <Output weather={weather} />
    </div>
  );
};

export default App