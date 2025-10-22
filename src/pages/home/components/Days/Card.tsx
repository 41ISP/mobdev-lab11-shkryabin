import React from "react";
import s from "./Days.module.scss";
import { Day } from "./Days";
import { GlobalSwgSelector } from "../../../../assets/icons/global/GlobalSwgSelector";

interface Props {
    day: Day;
    onClick?: () => void; 
}

export const Card: React.FC<Props> = ({ day, onClick }) => { 
  return (
    <div className={s.card} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={s.day}>{day.day}</div>
      <div className={s.day_info}>{day.day_info}</div>
      <div className={s.icon_id}>
        <GlobalSwgSelector id={day.icon_id}/>
      </div>
      <div className={s.temp_day}>{day.temp_day}</div>
      <div className={s.temp_night}>{day.temp_night}</div>
      <div className={s.info}>{day.info}</div>
    </div>
  );
};