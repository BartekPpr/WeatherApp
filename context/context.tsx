import {
  useState,
  useContext,
  createContext,
  type ReactNode,
} from "react";

type FavCity = {
    name: string,
    weather: string,
    temp: number
}
type FavContextType = {
  favCities: FavCity[];
  addToFavCities: (cityName: FavCity) => void;
};

const FavCityContext = createContext<FavContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [favCities, setFavCities] = useState<FavCity[]>([]);

  const addToFavCities = (cityName: FavCity) => {
    setFavCities((prev) => {
      if (!prev.find((city) => city.name === cityName.name)) {
        return [...prev, cityName];
      }
      return prev;
    });
  };

  return (
    <FavCityContext.Provider value={{ favCities, addToFavCities }}>
      {children}
    </FavCityContext.Provider>
  );
};
export const useFavCityContext = () => {
    const context = useContext(FavCityContext)
    if(!context){
        throw new Error ('')
    }
    return context
  }