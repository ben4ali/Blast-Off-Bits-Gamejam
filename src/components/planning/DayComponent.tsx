import React, {FC} from "react";
import { Day } from "../../types/day";

interface DayComponentProps {
    day: Day;
    index: number;
}

export const DayComponent : FC<DayComponentProps> = ({ day , index}) => {
    return(
        <div className="day" style={{ top: `${index * 40}rem` }}>
        <div className="day-title">
            <h3>{day.title}</h3>
            <p>{day.description}</p>
        </div>
        <div className="day-content">
            {day.plannings.map((planning, index) => (
            <div key={index} className="day-content-text">
                <span>{planning.time}</span>
                <p>{planning.description.toUpperCase()}</p>
            </div>
            ))}
        </div>
        </div>
    )
}