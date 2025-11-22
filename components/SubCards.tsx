import "../Css/SubCards.css";
import { useFavCityContext } from "../context/context";

export function SubCards() {
  const { favCities } = useFavCityContext();
  return (
    <>
      {favCities.map((fav) => (
        <div className="subCard" key={fav.name}>
          <h1 className="city">{fav.name.toUpperCase()}</h1>
          <div style={{ display: "flex" }}>
            <img src={fav.weather} alt="fdsf" />
            <h2 className="temp">{fav.temp}°C</h2>
          </div>
        </div>
      ))}
    </>
  );
}
