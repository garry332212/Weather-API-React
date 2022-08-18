import React, { useState } from "react";

const api = {
  apiKey: "0cc86d16bf572f78cdc96c096c7627e5",
  apiEndpoint: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  //initializing the states
  const [fetchData, setFetchData] = useState(""); // for api query
  const [weatherData, setWeatherData] = useState(""); // for UI
  const [invalidCity, setInvalidCity] = useState(true); //input validation
  const [startMsg, setStartMsg] = useState(true); //input validation

  //handling user input
  const inputHandler = (event) => {
    setFetchData(event.target.value);
  };

  // Date builder with month and day names as a string
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  //FUNCTION TO FETCH THE API data- On Form Submit (weather data from the given api)
  const fetchApi = async (event) => {
    event.preventDefault();

    if (fetchData.trim() === "") {
      setInvalidCity(false);
    } else {
      setInvalidCity(true);
      setStartMsg(false);
      fetch(
        `${api.apiEndpoint}weather?q=${fetchData}&units=metric&APPID=${api.apiKey}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeatherData(result);
          setFetchData("");
        });
    }
  };

  const classChanger = invalidCity ? "searchInput" : "searchError";
  return (
    <div
      className={
        typeof weatherData.main != "undefined"
          ? weatherData.main.temp > 20
            ? "container hot"
            : "container"
          : "container"
      }
    >
      <main>
        <form onSubmit={fetchApi}>
          <div className="searchArea">
            <input
              type="text"
              className={classChanger}
              placeholder="Enter City..."
              onChange={inputHandler}
              value={fetchData}
            />

            {startMsg && (
              <p className="welcome">Enter a City Name To Get The Weather</p>
            )}
            {!invalidCity && <p className="error">Please Enter a City Name</p>}
          </div>
        </form>
        {typeof weatherData.main != "undefined" ? (
          <div>
            <div className="locationArea">
              <div className="location">
                {weatherData.name} {weatherData.sys.country}
              </div>
              <div className="currentDate">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <div className="currentTemp">
                {Math.round(weatherData.main.temp)}°c
              </div>
              <div className="conditions">{weatherData.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}

        {weatherData.cod === "404" ? (
          <p className="noResults">
            {" "}
            City Not Found!! Enter a Valid City Name eg.{" "}
            <span style={{ color: "white", fontWeight: "bolder" }}>
              {" "}
              Auckland
            </span>{" "}
          </p>
        ) : (
          <></>
        )}

        <div className="footer">
          <p>©Gurvinder Singh 2022</p>
        </div>
      </main>
    </div>
  );
}

export default Weather;
