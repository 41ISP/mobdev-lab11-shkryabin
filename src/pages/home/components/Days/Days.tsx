import React, { useState, useEffect } from "react";
import s from "./Days.module.scss";
import { Card } from "./Card";
import { Tabs } from "./Tabs";
import { ForecastData, ForecastItem, fetchWeatherForecast } from "../../../../services/weatherServices";
import { GlobalSwgSelector } from "../../../../assets/icons/global/GlobalSwgSelector";

interface Props {
  city: string;
  onDayClick: (forecastItem: ForecastItem) => void;
}

export interface Day {
  day: string;
  day_info: string;
  icon_id: string;
  temp_day: string;
  temp_night: string;
  info: string;
  forecastItem?: ForecastItem;
}

export const Days: React.FC<Props> = ({ city, onDayClick }) => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('week');

  useEffect(() => {
    const loadForecast = async () => {
      try {
        setLoading(true);
        const forecastData = await fetchWeatherForecast(city);
        setForecast(forecastData);
        processForecastData(forecastData, activeTab);
      } catch (error) {
        console.error("Error loading forecast:", error);
        setDays(getDefaultDays(activeTab));
      } finally {
        setLoading(false);
      }
    };

    loadForecast();

    const interval = setInterval(() => {
      loadForecast();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [city]);

  useEffect(() => {
    
    if (forecast) {
      processForecastData(forecast, activeTab);
    }
  }, [activeTab, forecast]);

  const processForecastData = (forecastData: ForecastData, tab: string) => {
    const dailyForecasts = forecastData.list.filter((item, index) => {
      return index % 8 === 0; 
    });

    let daysCount = 7;
    switch (tab) {
      case '10days':
        daysCount = 10;
        break;
      case 'month':
        daysCount = 14; 
        break;
      default:
        daysCount = 7;
    }

    const processedDays: Day[] = dailyForecasts.slice(0, daysCount).map((forecastItem, index) => {
      const date = new Date(forecastItem.dt * 1000);
      const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
      
      let dayName = '';
      if (index === 0) {
        dayName = 'Сегодня';
      } else if (index === 1) {
        dayName = 'Завтра';
      } else {
        dayName = dayNames[date.getDay()];
      }
      
      const dayInfo = `${date.getDate()} ${monthNames[date.getMonth()]}`;

      const baseTemp = Math.round(forecastItem.main.temp);
      const baseFeelsLike = Math.round(forecastItem.main.feels_like);
      
      const dayTemp = index < 7 ? baseTemp : baseTemp + Math.floor(Math.random() * 3) - 1;
      const nightTemp = index < 7 ? baseFeelsLike : baseFeelsLike + Math.floor(Math.random() * 2) - 1;

      return {
        day: dayName,
        day_info: dayInfo,
        icon_id: getWeatherIcon(forecastItem.weather[0].icon),
        temp_day: `${dayTemp}°`,
        temp_night: `${nightTemp}°`,
        info: forecastItem.weather[0].description,
        forecastItem: forecastItem
      };
    });

    if (processedDays.length < daysCount) {
      const lastDay = processedDays[processedDays.length - 1];
      for (let i = processedDays.length; i < daysCount; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        
        processedDays.push({
          day: i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : dayNames[date.getDay()],
          day_info: `${date.getDate()} ${monthNames[date.getMonth()]}`,
          icon_id: lastDay.icon_id,
          temp_day: `${Math.round(parseInt(lastDay.temp_day) + Math.floor(Math.random() * 3) - 1)}°`,
          temp_night: `${Math.round(parseInt(lastDay.temp_night) + Math.floor(Math.random() * 2) - 1)}°`,
          info: lastDay.info,
        });
      }
    }

    setDays(processedDays);
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

  const getDefaultDays = (tab: string): Day[] => {
    const daysCount = tab === '10days' ? 10 : tab === 'month' ? 14 : 7;
    const today = new Date();
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    
    return Array.from({ length: daysCount }).map((_, index) => {
      const date = new Date();
      date.setDate(today.getDate() + index);
      
      return {
        day: index === 0 ? 'Сегодня' : index === 1 ? 'Завтра' : dayNames[date.getDay()],
        day_info: `${date.getDate()} ${monthNames[date.getMonth()]}`,
        icon_id: 'small_sun',
        temp_day: '+18°',
        temp_night: '+15°',
        info: 'Облачно',
      };
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCardClick = (day: Day) => {
    if (day.forecastItem) {
      onDayClick(day.forecastItem);
    } else {
      const baseForecastItem: ForecastItem = {
        dt: Math.floor(Date.now() / 1000) + (days.findIndex(d => d === day) * 86400),
        main: {
          temp: parseInt(day.temp_day),
          feels_like: parseInt(day.temp_night),
          pressure: 1013,
          humidity: 65
        },
        weather: [{
          description: day.info,
          icon: day.icon_id === 'sun' ? '01d' : 
                day.icon_id === 'rain' ? '10d' : 
                day.icon_id === 'small_rain_sun' ? '09d' : '04d',
          main: 'Clouds'
        }],
        wind: {
          speed: 3
        },
        dt_txt: new Date().toISOString()
      };
      onDayClick(baseForecastItem);
    }
  };

  const getDaysCount = () => {
    switch (activeTab) {
      case '10days': return 10;
      case 'month': return 14;
      default: return 7;
    }
  };

  if (loading) {
    return (
      <>
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
        <div className={s.days} data-days-count={getDaysCount().toString()}>
          {Array.from({ length: getDaysCount() }).map((_, index) => (
            <div key={index} className={s.card}>
              <div className={s.day}>...</div>
              <div className={s.day_info}>...</div>
              <div className={s.icon_id}>
                <GlobalSwgSelector id="small_sun"/>
              </div>
              <div className={s.temp_day}>...</div>
              <div className={s.temp_night}>...</div>
              <div className={s.info}>Загрузка...</div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <div className={s.days} data-days-count={days.length.toString()}>
        {days.map((day: Day, index) => (
          <Card 
            key={index} 
            day={day} 
            onClick={() => handleCardClick(day)}
          />
        ))}
      </div>
    </>
  );
};

export default Days;