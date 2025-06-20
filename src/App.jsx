// App.jsx
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MainWeatherCard from "./components/MainWeatherCard";
import FiveDayForecast from "./components/fiveday";
import TodayHighlights from "./components/Todayhighlights";
import axios from "axios";
import './App.css';

const API_KEY = 'd7700811e06c225223649ba62c84c7c6';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [cityInput, setCityInput] = useState("");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => setAirQualityData(response.data.list[0]))
      .catch(error => console.error('Air quality fetch error:', error));
  };

  const fetchWeatherData = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          setWeatherData(data);
          setErrorMessage("");
          fetchAirQualityData(data.coord.lat, data.coord.lon);
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`)
            .then(response => setFiveDayForecast(response.data))
            .catch(error => console.error('5-day forecast error:', error));
        } else {
          setWeatherData(null);
          setAirQualityData(null);
          setFiveDayForecast(null);
          setErrorMessage("City not found. Please try another.");
        }
      })
      .catch(error => {
        console.error('Weather fetch error:', error);
        setErrorMessage("An error occurred while fetching data.");
      });
  };

  const fetchWeatherByCoords = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      .then(response => {
        const data = response.data;
        setWeatherData(data);
        setErrorMessage("");
        fetchAirQualityData(lat, lon);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
          .then(res => setFiveDayForecast(res.data))
          .catch(error => console.error('Forecast by coords error:', error));
      })
      .catch(error => {
        console.error('Weather by coords error:', error);
        setErrorMessage("Unable to fetch weather for your location.");
      });
  };

  const handleSearch = (searchedCity) => setCity(searchedCity);
  const handleClearSearchInput = () => setCityInput("");

  return (
    <div>
      <Navbar
        onSearch={handleSearch}
        onLocationSearch={fetchWeatherByCoords}
        cityInput={cityInput}
        setCityInput={setCityInput}
        onClearInput={handleClearSearchInput}
      />

      {errorMessage ? (
        <div className="loading">{errorMessage}</div>
      ) : weatherData && airQualityData ? (
        <div className="dashboard">
          <div className="left-panel">
            <MainWeatherCard weatherData={weatherData} />
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>
              5 Days Forecast
            </p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>

          <div className="right-panel">
            <TodayHighlights
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
          </div>
        </div>
      ) : (
        <div className="loading">Loading weather data...</div>
      )}
    </div>
  );
};

export default App;