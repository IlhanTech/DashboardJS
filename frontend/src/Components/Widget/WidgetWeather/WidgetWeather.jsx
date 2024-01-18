import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './WidgetWeather.css';
import weatherImages from './images';

const WidgetWeather = () => {
  const [searchTerm, setSearchTerm] = useState('Lyon');
  const [weatherData, setWeatherData] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
      setShowSearch(false);
    }
  };

  return (
    <div className="widget-container">
      <div className="settings-search-container">
        {showSearch && (
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
            style={{ display: showSearch ? 'block' : 'none' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        )}
        <button
          onClick={toggleSearch}
          className={`settings-button ${showSearch ? 'active' : ''}`}
        >
          ⚙️
        </button>
      </div>
      <div className="result-container">
        {weatherData ? (
          <>
            <p className='paraf'>{`${searchTerm}: ${Math.round(weatherData.main.temp)}°C`}</p>
            <img src={weatherImages[weatherData.weather[0].main] || weatherImages.Default} alt="Weather Icon" className='imgWeather'/>
          </>
        ) : (
          searchTerm && <p>Aucun résultat trouvé</p>
        )}
      </div>
    </div>
  );
};

export default WidgetWeather;
