import React from 'react'

export const Current = ({ weather, convertTimestamp, windDirection, loading }) => {

  if (loading || (typeof weather.name === 'undefined')) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div>

        <div>
          <h2 id="CH">Weather in {weather.name}, {weather.sys.country} now:</h2>
          <h1>{weather.weather[0].main}</h1>
          <h6>{weather.weather[0].description}</h6>
          <br />
          <p>{`Temperature: ${(weather.main.temp).toFixed(1)} °C`}</p>
          <p>{`Wind: ${windDirection(
            weather.wind.deg
          )} ${weather.wind.speed.toFixed()} m/s`}</p>
          <p>{`Feels like: ${(weather.main.feels_like.toFixed(1))} °C`}</p>
          <p>{`Atm pressure: ${(weather.main.pressure / 1.333).toFixed(
            2
          )} mm Hg`}</p>
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
          {/* eslint-disable-next-line */}
          <p>{`Visibility: ${((weather.visibility / 1000).toFixed(1) == 10.0)
          ? 10 : (weather.visibility / 1000).toFixed(1)} km`}</p>
        </div>

    </div>
  );
};
