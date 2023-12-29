import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './WidgetWeather.css';
import weatherImages from './images';

const WidgetWeather = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (searchTerm) {
        fetchData();
      }
    }, 30000);
    return () => clearInterval(intervalId);
  }, [searchTerm, fetchData]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="widget-container">
      <input
        type="text"
        placeholder="Rechercher..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="result-container">
        {weatherData ? (
          <>
            <p className='paraf'>{`Temperature: ${Math.round(weatherData.main.temp - 273.15)}°C`}</p>
            <img src={weatherImages[weatherData.weather[0].main] || weatherImages.Default} alt="Weather Icon" className='imgWeather'/>
          </>
        ) : (
          <p>Aucun résultat trouvé</p>
        )}
      </div>
    </div>
  );
};

export default WidgetWeather;
