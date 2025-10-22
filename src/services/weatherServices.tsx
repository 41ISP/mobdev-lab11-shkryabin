export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  dt: number;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}


const API_KEY = "f2d043a361854abc469484ef1e89fd65"; 

const BASE_URL = "https://api.openweathermap.org/data/2.5";

let cache: { [key: string]: { data: any, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000;

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  const cacheKey = `current_${city}`;
  const cached = cache[cacheKey];
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
  );
  
  if (!response.ok) {
    throw new Error('Ошибка получения данных о погоде');
  }
  
  const data = await response.json();
  
  cache[cacheKey] = {
    data,
    timestamp: Date.now()
  };
  
  return data;
};

export const fetchWeatherForecast = async (city: string): Promise<ForecastData> => {
  const cacheKey = `forecast_${city}`;
  const cached = cache[cacheKey];
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru&cnt=40`
  );
  
  if (!response.ok) {
    throw new Error('Ошибка получения прогноза погоды');
  }
  
  const data = await response.json();
  
  cache[cacheKey] = {
    data,
    timestamp: Date.now()
  };
  
  return data;
};