import React from "react";
import s from "./Days.module.scss";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      value: 'week',
      label: 'На неделю'
    },
    { 
      value: '10days', 
      label: 'На 10 дней' 
    },
    { 
      value: 'month', 
      label: 'На месяц' 
    },
  ];

  const handleCancel = () => {
    console.log('Отмена');
  };

  return (
    <div className={s.tabs}>
      <div className={s.tabs_wrapper}>
        {tabs.map(tab => {
          return (
            <div 
              className={`${s.tab} ${activeTab === tab.value ? s.active : ''}`} 
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
            >
              {tab.label}
            </div>
          );
        })} 
      </div> 
      <div className={s.cancel} onClick={handleCancel}>
        Отменить
      </div>
    </div>
  );
};