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

    fetchData()


  }, [location, urlWeather, urlForecast]);

  return (
    <div className="container">
      <div className="header" >
        <div className="logo">Weather App</div>
        <Input  setLocation={setLocation} />
      </div>
      <div className="content">
        <Output
          weather={weather}
          forecast={forecast}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App