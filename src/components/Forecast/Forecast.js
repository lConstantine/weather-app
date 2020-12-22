import React from 'react'
import { Pagination } from '../Pagination/Pagination'

export const Forecast = ({
  weather,
  forecast,
  loading,
  convertTimestamp,
  windDirection,
  forecastsPerPage,
  totalForecasts,
  paginate,
}) => {

  if (loading || (typeof weather.name === 'undefined')) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div>

        <div >

          <h2 id="FH">{`Weather forecast in ${weather.name}, ${weather.sys.country} at:`}</h2>
          <ul>
            {forecast.map((it, idx) => (
              <li className="forecastListItem" key={idx + 1}>
                <h5 className="date">{convertTimestamp(it.dt)}</h5>
                <h1>{it.weather[0].main}</h1>
                <h4>{it.weather[0].description}</h4>
                <br />
                <p>{`Temperature: ${(it.main.temp).toFixed(1)} °C`}</p>
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
      <div className="pagination">
      <Pagination
        forecastsPerPage={forecastsPerPage}
        totalForecasts={totalForecasts}
        paginate={paginate}
      />
      </div>
    </div>
  );
};
