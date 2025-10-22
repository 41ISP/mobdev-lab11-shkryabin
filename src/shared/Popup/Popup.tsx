// shared/Popup/Popup.tsx
import React from "react";
import s from "./Popup.module.scss";
import { Item } from "../../pages/home/components/ThisDayInfo/ThisDayInfo"; 
import { ThisDayItem } from "../../pages/home/components/ThisDayInfo/ThisDayItem"; 
import { GlobalSwgSelector } from "../../assets/icons/global/GlobalSwgSelector";
import { WeatherData, ForecastItem } from "../../services/weatherServices";

interface PopupProps {
  weatherData: WeatherData | ForecastItem | null;
  onClose: () => void;
  type: 'current' | 'forecast';
}

export const Popup: React.FC<PopupProps> = ({ weatherData, onClose, type }) => {
  if (!weatherData) return null;

  const getDayOfWeek = (timestamp: number) => {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[new Date(timestamp * 1000).getDay()];
  };

  const getTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': 'sun',
      '01n': 'moon',
      '02d': 'small_sun',
      '02n': 'small_moon',
      '03d': 'mainly_cloudy',
      '03n': 'mainly_cloudy',
      '04d': 'mainly_cloudy',
      '04n': 'mainly_cloudy',
      '09d': 'rain',
      '09n': 'rain',
      '10d': 'small_rain_sun',
      '10n': 'small_rain_moon',
      '11d': 'lightning',
      '11n': 'lightning',
      '13d': 'snow',
      '13n': 'snow',
      '50d': 'fog',
      '50n': 'fog'
    };
    return iconMap[iconCode] || 'small_sun';
  };

 
  const isCurrentWeather = (data: WeatherData | ForecastItem): data is WeatherData => {
    return 'name' in data && 'sys' in data;
  };

  const items: Item[] = [
    {
      icon_id: 'temp',
      name: 'Температура',
      value: `${Math.round(weatherData.main.temp)}° - ощущается как ${Math.round(weatherData.main.feels_like)}°`
    },
    {
      icon_id: 'pressure',
      name: 'Давление',
      value: `${weatherData.main.pressure} мм рт. ст.`
    },
    {
      icon_id: 'humidity',
      name: 'Влажность',
      value: `${weatherData.main.humidity}%`
    },
    {
      icon_id: 'wind',
      name: "Ветер",
      value: `${weatherData.wind.speed} м/с`
    }
  ];

  const getCityName = () => {
    if (isCurrentWeather(weatherData)) {
      return `${weatherData.name}, ${weatherData.sys.country}`;
    } else {
     
      return 'Прогноз на день';
    }
  };

  return (
    <>
      <div className={s.blur} onClick={onClose}></div>
      <div className={s.popup}>
        <div className={s.day}>
          <div className={s.day__temp}>{Math.round(weatherData.main.temp)}°</div>
          <div className={s.day__name}>{getDayOfWeek(weatherData.dt)}</div>
          <div className={s.day_img}>
            <GlobalSwgSelector id={getWeatherIcon(weatherData.weather[0].icon)}/>
          </div>
          <div className={s.day__time}>
            Время: <span>{getTime(weatherData.dt)}</span>
          </div>
          <div className={s.day__city}>
            {isCurrentWeather(weatherData) ? 'Город:' : 'Прогноз:'} <span>{getCityName()}</span>
          </div>
        </div>

        <div className={s.this_day_info_items}>
          {items.map((item: Item) => (
            <ThisDayItem key={item.icon_id} item={item} />
          ))}
        </div>
        <div className={s.close} onClick={onClose}>
          <GlobalSwgSelector id="close"/>
        </div>
      </div>
    </>
  );
};