import React, {useState} from "react";
import "../styles/style-hero.css";
import { Countdown } from "./hero/Countdown";
import { ArrowDown } from "lucide-react";

export const HeroComponent = () => {
    const [eventDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 10);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).toUpperCase();
    });

    return (
        <div className="hero-container">
            <div className="info-container">
                <div className="info-header">
                    <h1>BLAST OFF BITS</h1>
                    <h2>48-HOURS GAMEJAM</h2>
                    <h3>{eventDate}</h3>
                </div>


                <p className="gamejam-slogan">
                    CREATE, COMPETE, AND CONQUER IN BLAST OFF BITS! UNLEASH YOUR CREATIVITY IN 48 HOURS OF RETRO GAME-MAKING FUN.
                </p>

                <div className="btn-container">
                    <a className="btn-pixel signup">
                        SIGN UP
                    </a>
                    <a className="btn-pixel explore">
                        EXPLORE
                    </a>
                </div>


                <Countdown />
            </div>
          
            <div className="screen"></div>
            <div className="scroll-down">
                <p>SCROLL</p>
                <ArrowDown className="arrow-down" size={24} color="var(--accent)" />
            </div>
        </div>
 
    )

}