import React from "react";
import s from "./ThisDay.module.scss";
import { GlobalSwgSelector } from "../../../../assets/icons/global/GlobalSwgSelector";
import { WeatherData } from "../../../../services/weatherServices";

interface Props {
  weatherData: WeatherData | null;
  onClick: () => void;
  loading?: boolean;
}

export const ThisDay: React.FC<Props> = ({ weatherData, onClick, loading = false }) => {
  const getWeatherIcon = (iconCode: string | undefined) => {
    if (!iconCode) return 'sun';
    
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
    return iconMap[iconCode] || 'sun';
  };

  const getTime = () => {
    return new Date().toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={s.this_day}>
        <div className={s.top_block}> 
          <div className={s.top_block_wrapper}>
            <div className={s.this_temp}>...</div>
            <div className={s.this_day_day}>Загрузка</div>
          </div>
          <GlobalSwgSelector id="sun" />
        </div>
        <div className={s.bottom_block}> 
          <div className={s.this_time}>
            Время: <span>{getTime()}</span>
          </div>
          <div className={s.this_city}>
            Город: <span>Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.this_day} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className={s.top_block}> 
        <div className={s.top_block_wrapper}>
          <div className={s.this_temp}>
            {weatherData ? `${Math.round(weatherData.main.temp)}°` : '18°'}
          </div>
          <div className={s.this_day_day}>Сегодня</div>
        </div>
        <GlobalSwgSelector id={getWeatherIcon(weatherData?.weather[0]?.icon)} />
      </div>
      <div className={s.bottom_block}> 
        <div className={s.this_time}>
          Время: <span>{getTime()}</span>
        </div>
        <div className={s.this_city}>
          Город: <span>{weatherData ? weatherData.name : 'Минск'}</span>
        </div>
      </div>
    </div>
  );
};

export default ThisDay;