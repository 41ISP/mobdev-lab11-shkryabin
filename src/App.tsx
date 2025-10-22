// App.tsx
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/components/home';
import { MonthStatistics } from './pages/monthStatics/components/monthStatistics';
import Header from './shared/Header/Header';
import { Popup } from './shared/Popup/Popup';
import { WeatherData, ForecastItem } from './services/weatherServices';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | ForecastItem | null>(null);
  const [popupType, setPopupType] = useState<'current' | 'forecast'>('current');
  const [currentCity, setCurrentCity] = useState('Moscow');

  const openPopup = (weatherData: WeatherData | ForecastItem, type: 'current' | 'forecast') => {
    setCurrentWeather(weatherData);
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentWeather(null);
  };

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
  };

  return (
    <div className="Global_container">
      {isPopupOpen && (
        <Popup 
          weatherData={currentWeather} 
          onClose={closePopup} 
          type={popupType}
        />
      )}
      <div className="container">
        <Header onCityChange={handleCityChange} currentCity={currentCity} />
        <Routes>
          <Route 
            path="/"  
            element={<Home city={currentCity} onOpenPopup={openPopup} />} 
          />
          <Route 
            path="/month-statistics" 
            element={<MonthStatistics />} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;