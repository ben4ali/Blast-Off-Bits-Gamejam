import { useState, useEffect, useMemo } from "react";
import "../../styles/style-hero.css";

export const Countdown = () => {
    const targetDate = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 10);
        return date;
    }, []);
    const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(targetDate.getTime() - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="screen screen-countdown">
            <div className="countdown-container">
                <h3>COUNTDOWN :</h3>
                <div className="countdown-timer">
                    <p><span className="time">{Math.floor(timeLeft / (1000 * 60 * 60 * 24))}</span> DAYS</p>
                    <p><span className="time">{Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}</span> HRS</p>
                    <p><span className="time">{Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))}</span> MIN</p>
                    <p><span className="time">{Math.floor((timeLeft % (1000 * 60)) / 1000)}</span> SEC</p>
                </div>
                
            </div>
        </div>

    );
};