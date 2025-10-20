import React from "react";
import s from "./ThisDayInfo.module.scss";
import { ThisDayItem } from "./ThisDayItem";
import { WeatherData } from "../../../../services/weatherServices";

interface Props {
  weatherData: WeatherData | null;
}

export interface Item {
  icon_id: string;
  name: string;
  value: string;
}

export const ThisDayInfo: React.FC<Props> = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <div className={s.this_day_info}>
        <div className={s.this_day_info_items}>
          <div className={s.loading}>Загрузка данных...</div>
        </div>
      </div>
    );
  }

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

  return (
    <div className={s.this_day_info}>
      <div className={s.this_day_info_items}>
        {items.map((item: Item) => (
          <ThisDayItem key={item.icon_id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ThisDayInfo;