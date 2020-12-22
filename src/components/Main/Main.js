import React, { useState, useEffect } from 'react';
import axios from 'axios'


import { Input } from '../Input/Input'
import { Output } from '../Output/Output'


export const Main = () => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState("Moscow");
  const [loading, setLoading] = useState(false);

  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=144bb6c6c8c045fbb19524051d0be93a`;

  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=144bb6c6c8c045fbb19524051d0be93a`;


  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
        try {
          await axios(urlWeather).then(resp => setWeather({...resp.data}));
          await axios(urlForecast).then(resp => setForecast(resp.data.list));
        } catch(e) {
          console.log(e)
        }
      setLoading(false)
    }

    fetchData()

  }, [location, urlWeather, urlForecast]);

  return (
    <div className="container">

      <div className="header" >
        <h1 className="logo">Weather App</h1>
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
