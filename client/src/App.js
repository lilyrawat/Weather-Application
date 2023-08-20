import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [background, setBackground] = useState(
    `url(https://source.unsplash.com/1600x900/?landscape)`
  );
  const [image, setImage] = useState();
  const [location, setLocation] = useState("");
  const key = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setBackground(
            data.weather
              ? "url(https://source.unsplash.com/1600x900/?" +
                  data.weather[0].main +
                  ")"
              : "url(https://source.unsplash.com/1600x900/?weather)"
          );
          setImage(
            data.weather
              ? "http://openweathermap.org/img/w/" +
                  data.weather[0].icon +
                  ".png"
              : null
          );
          console.log(response.data);
        })
        .catch((error) => {
          alert(
            "Oops! This doesn't seem to be a city.\nPlease try some other city name. :)"
          );
          console.log("Error:", error);
        });
      setLocation("");
    }
  };

  useEffect(() => {
    document.body.style.background = background;
  }, [background]);

  useEffect(() => {
    document.getElementsByClassName("weather-icon").src = image;
  }, [image]);

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          name="location"
          placeholder="Enter Location"
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          {data.weather ? (
            <img
              src={
                "http://openweathermap.org/img/w/" +
                data.weather[0].icon +
                ".png"
              }
              className="weather-icon"
              alt="weather icon"
            />
          ) : null}

          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like} °C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}% </p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed} km/h </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
