import React from "react";
import s from "./Header.module.scss";
import { GlobalSwgSelector } from "../../assets/icons/global/GlobalSwgSelector";
import Select from 'react-select';

interface Props {
  onCityChange: (city: string) => void;
  currentCity: string;
}


const cities = [
  { value: 'Moscow', label: 'Москва' },
  { value: 'Saint Petersburg', label: 'Санкт-Петербург' },
  { value: 'Minsk', label: 'Минск' },
  { value: 'Kiev', label: 'Киев' },
  { value: 'London', label: 'Лондон' },
  { value: 'New York', label: 'Нью-Йорк' },
  { value: 'Paris', label: 'Париж' },
  { value: 'Berlin', label: 'Берлин' },
  { value: 'Tokyo', label: 'Токио' },
  { value: 'Beijing', label: 'Пекин' },
  { value: 'Istanbul', label: 'Стамбул' },
  { value: 'Dubai', label: 'Дубай' },
  { value: 'Sydney', label: 'Сидней' },
  { value: 'Toronto', label: 'Торонто' },
  { value: 'Rio de Janeiro', label: 'Рио-де-Жанейро' }
];

const colorStyles = {
  control: (styles: any) => ({ 
    ...styles, 
    backgroundColor: "rgba(71, 147, 255, 0.2)", 
    width: "194px", 
    height: "37px", 
    border: "none", 
    borderRadius: "10px", 
    zIndex: "100",
    color: "#000",
    minHeight: '37px',
  }),
  menu: (styles: any) => ({
    ...styles,
    zIndex: 1000,
  }),
  menuList: (styles: any) => ({
    ...styles,
    maxHeight: '200px', 
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    backgroundColor: isSelected 
      ? '#4793FF' 
      : isFocused 
      ? 'rgba(71, 147, 255, 0.1)' 
      : 'white',
    color: isSelected ? 'white' : 'black',
    cursor: 'pointer',
  }),
};

export const Header: React.FC<Props> = ({ onCityChange, currentCity }) => {
  const handleCityChange = (selectedOption: any) => {
    onCityChange(selectedOption.value);
  };

  const defaultCity = cities.find(city => city.value === currentCity) || cities[0];

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logo}><GlobalSwgSelector id="header-logo" /></div>
        <div className={s.title}>React Weather</div>
      </div>

      <div className={s.wrapper}>
        <div className={s.changeTheme}>
          <GlobalSwgSelector id="change-theme" />
        </div>
        <Select 
          styles={colorStyles} 
          options={cities} 
          onChange={handleCityChange}
          defaultValue={defaultCity}
          value={defaultCity}
          isSearchable={true} 
          menuPlacement="auto" 
        />
      </div>
    </header>
  );
};

export default Header;