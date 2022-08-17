import React, {useState } from "react";

const api = {
  apiKey: "0cc86d16bf572f78cdc96c096c7627e5",
  apiEndpoint: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  //initializing the states
  const [fetchData, setFetchData] = useState(""); // for api query
  const [weatherData, setWeatherData] = useState(""); // for UI

  //handling user input

  const inputHandler = (event) => {
    setFetchData(event.target.value);
  };


  //FUNCTION TO FETCH THE API data (weather data from the given api)
  const fetchApi = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.apiEndpoint}weather?q=${fetchData}&units=metric&APPID=${api.apiKey}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherData(result);
          setFetchData("");
        //   console.log(result);
        });
    }
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
        <div className="searchArea">
          <input
            type="text"
            className="searchInput"
            placeholder="Enter City..."
            onChange={inputHandler}
            value={fetchData}
            onKeyPress={fetchApi}
          />
        </div>
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
      </main>
    </div>
  );
}

export default Weather;
