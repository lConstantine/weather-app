import React, { useState } from 'react'
import Current from './Current'
import Forecast from "./Forecast"


const Output = ({ weather, forecast, loading }) => {

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

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [forecastsPerPage] = useState(8);

  const indexOfLastForecast = currentPage * forecastsPerPage;
  const indexOfFirstForecast = indexOfLastForecast - forecastsPerPage;
  const currentForecasts = forecast.slice(
    indexOfFirstForecast,
    indexOfLastForecast
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (

      <div className="wrapper">

        <div className="leftContent">
          <Current
            weather={weather}
            loading={loading}
            convertTimestamp={convertTimestamp}
            windDirection={windDirection}
          />
        </div>

        <div className="rightContent">
          <Forecast
            weather={weather}
            loading={loading}
            forecast={currentForecasts}
            convertTimestamp={convertTimestamp}
            windDirection={windDirection}
            forecastsPerPage={forecastsPerPage}
            totalForecasts={forecast.length}
            paginate={paginate}
          />
        </div>
      </div>

  );
};

export default Output