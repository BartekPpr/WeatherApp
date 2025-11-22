import { useQuery } from "@tanstack/react-query";
import "../Css/MainCard.css";
import searchImage from "../assets/search.png";
import clear from "../assets/clear.svg";
import rain from "../assets/rain.svg";
import snow from "../assets/snow.svg";
import partlyCloudy from "../assets/partly-cloudy.svg";
import drizzle from "../assets/drizzle.svg";
import wind from "../assets/wind.svg";
import humidity from "../assets/humidity.svg";
import { useState } from "react";
import { useFavCityContext } from "../context/context";



async function fetchWeatherPrognosis(city: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export function Forecast() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");

  const { favCities, addToFavCities } = useFavCityContext()
  const isFav = favCities.some((fav) => fav.name === city)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchWeatherPrognosis(city),
    retry: false,
    enabled: city.trim() !== "",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Fetching data we want
  const iconCode = data?.weather[0].icon;
  const temp = data ? Math.round(data.main.temp) : 0;
  const humidityPercentage = data?.main.humidity;
  const windSpeed = data?.wind.speed;
  const weatherIcons: Record<string, string> = {
    "01d": clear,
    "01n": clear,
    "02d": partlyCloudy,
    "02n": partlyCloudy,
    "03d": partlyCloudy,
    "03n": partlyCloudy,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };
  const icon = weatherIcons[iconCode] || clear;

  return (
    <div style={{ justifyItems: "center" }}>
      <div className="mainCard">
        <div className="searchComponents">
          <input
            type="text"
            value={inputCity}
            placeholder="Search City Name..."
            className="searchBar"
            onChange={(e) => setInputCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputCity.trim() !== "") {
                setCity(inputCity.trim());
              }
            }}
          />
          <button onClick={() => setInputCity("")}>&times;</button>
          <img
            src={searchImage}
            alt="magnifier"
            className="searchIcon"
            onClick={() => {
              if (inputCity.trim() === "") {
                return;
              }
              setCity(inputCity.trim());
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {city !== "" && !isError && <button className="favorite" 
          style={{color: isFav ? '#ff1381' : "white"}}
          onClick={() => addToFavCities({name: city, weather: icon, temp})
            
        }
          >♥</button>}
          <h1 className="cityName">{city.toUpperCase()}</h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "2em",
            color: "black",
            paddingRight: "25px",
          }}
        >
          <img src={icon} alt="" className="weatherIcon" />
          <h2>{temp}°C</h2>
        </div>
        <div className="weatherInfo">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={wind} alt="" className="infoImg" /> {windSpeed} km/h
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={humidity} alt="" className="infoImg" />
            {humidityPercentage}% Humidity
          </div>
        </div>
      </div>
      {isError && (
        <p style={{ color: "red" }}>
          <b>ERROR! City not found</b>
        </p>
      )}
    </div>
  );
}

export function MainCard() {
  return <Forecast />;
}
