import React, { useState, useEffect } from "react";
import s from "./home.module.scss";
import ThisDay from "./ThisDay/ThisDay";
import ThisDayInfo from "./ThisDayInfo/ThisDayInfo";
import Days from "./Days/Days";
import { WeatherData, ForecastItem, fetchCurrentWeather } from "../../../services/weatherServices";

interface HomeProps {
  city: string;
  onOpenPopup: (weatherData: WeatherData | ForecastItem, type: 'current' | 'forecast') => void;
}

export const Home: React.FC<HomeProps> = ({ city, onOpenPopup }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadWeatherData = async (cityName: string) => {
    try {
      setLoading(true);
      const weather = await fetchCurrentWeather(cityName);
      setCurrentWeather(weather);
    } catch (error) {
      console.error("Error loading weather:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData(city);
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadWeatherData(city);
    }, 5 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [city]);

  const handleThisDayClick = () => {
    if (currentWeather) {
      onOpenPopup(currentWeather, 'current');
    }
  };

  const handleDayClick = (forecastItem: ForecastItem) => {
    onOpenPopup(forecastItem, 'forecast');
  };

  return (
    <div className={s.home}>
      <div className={s.wrpapper}>
        <ThisDay 
          weatherData={currentWeather} 
          onClick={handleThisDayClick}
          loading={loading}
        />
        <ThisDayInfo weatherData={currentWeather} />
      </div>
      <Days city={city} onDayClick={handleDayClick} />
    </div>
  );
};