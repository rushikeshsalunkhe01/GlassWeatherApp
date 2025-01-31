import { useState, useEffect } from "react";
import "../styles/styles.css";

const API_KEY = "bdaf7c376617c636cc9b3939c0b706a9";

const getImage = (weather) => {
  if (!weather) return "/img/default.jpg";
  if (weather.includes("Clear")) return "/img/sunny.jpg";
  if (weather.includes("Clouds")) return "/img/cloudy.jpg";
  if (weather.includes("Rain")) return "/img/rainy.jpg";
  if (weather.includes("Snow")) return "/img/snowy.jpg";
  if (weather.includes("Thunderstorm")) return "/img/storm.jpg";
  return "/img/default.jpg";
};

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Mumbai");

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error("Error fetching weather data:", err));
  }, [city]);

  return (
    <div className="app" style={{ backgroundImage: `url(${getImage(weather?.weather?.[0]?.main)})` }}>
      <div className="glass-container">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-box"
        />
        {weather?.main && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{weather.weather[0].description}</p>
            <img src={getImage(weather?.weather[0]?.main)} alt="Weather Icon" className="weather-img" />
            <h3>{Math.round(weather.main.temp)}°C</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
