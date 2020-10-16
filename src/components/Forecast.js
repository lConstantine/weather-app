import React from 'react'
import Pagination from './Pagination'

const Forecast = ({
  weather,
  forecast,
  convertTimestamp,
  windDirection,
  forecastsPerPage,
  totalForecasts,
  paginate,
}) => {



  if (!weather) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div>
        <div>
          {`Weather forecast in ${weather.name}, ${weather.sys.country} at:`}
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
      <Pagination
        forecastsPerPage={forecastsPerPage}
        totalForecasts={totalForecasts}
        paginate={paginate}
      />
    </div>
  );
};

export default Forecast