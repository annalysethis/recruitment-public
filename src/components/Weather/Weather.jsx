import React, { useState } from "react";
import "./Weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  let [location, setLocation] = useState();
  let [currentWeather, setCurrentWeather] = useState({});

  function getCurrentWeather(e) {
    e.preventDefault();

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a17480f70f0d4368ad0b5eabd0e37b66`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setCurrentWeather(response);
      });
  }

  const calCelsius = () => {
    try {
      const kelvin = currentWeather.main.temp;
      const celsius = Math.round(kelvin - 273.15);
      if (kelvin === null || celsius === null) {
        return false;
      }
      return <h1>{celsius}&deg;</h1>;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div>
      <h2>How's the weather out there?</h2>
      <form onSubmit={getCurrentWeather}>
        <input
          type="text"
          placeholder="Enter City"
          maxLength="50"
          className="textInput"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button class="Button" type="submit">
          Get Weather
        </button>
      </form>
      <div>
        <div className="Wrapper">
          <h1>{currentWeather.name ? `${currentWeather.name}` : ""}</h1>
          <FontAwesomeIcon className="Marker" icon={faMapMarkerAlt} />
        </div>
        <div className="Wrapper">
          {calCelsius()}
          {calCelsius() ? (
            <img
              className="Icon"
              src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
              alt=""
            />
          ) : (
            ""
          )}
        </div>
        <h3>{!currentWeather.name ? "please enter a location..." : ""}</h3>
      </div>
    </div>
  );
};

export default Weather;
