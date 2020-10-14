import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Input from './components/Input'
import Output from './components/Output'


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