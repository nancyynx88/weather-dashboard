import React, { useState } from 'react';
import './styles.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(
      city
    )}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '86e8d7d48cmshb76e6b386709746p1e6a28jsn3262e33a0394',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };
    try {
      // Replace with your actual API endpoint and key
      const response = await fetch(url, options);
      console.log('***Response is: ', response);
      if (!response.ok) throw new Error(`Weather data for "${city}" not found`);
      const result = await response.json();

      console.log('**Result is: ', result);
      //   const data = await response.json();
      //   console.log('**Data is: ', data);
      setWeatherInfo(result);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherInfo(null);
    }
  };
  const handleSearch = () => {
    fetchWeather();
  };
  return (
    <div>
      <header>
        <h1>Weather Dashboard</h1>
      </header>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Enter city name...'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='weather-display'>
        {weatherInfo && (
          <div>
            <h2>Weather in {weatherInfo.location.name}</h2>
            <p>Temperature: {weatherInfo.current.temp_f}°F</p>
            <p>Humidity: {weatherInfo.current.humidity}%</p>
            <p>Wind Speed: {weatherInfo.current.wind_mph} mph</p>
          </div>
        )}
      </div>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};

export default App;
