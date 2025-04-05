import React, {useState} from "react";
import { Theme } from "../types/theme";
import { ThemeCard } from "./theme/ThemeCard";
import "../styles/style-theme.css";
import SpaceOdysseyIcon from "../assets/images/SpaceOdysseyIcon.png";
import UnderwaterWorldIcon from "../assets/images/UnderwaterWorldIcon.png";
import CyberpunkCityIcon from "../assets/images/CyberpunkCityIcon.png";

export const ThemeComponent = () => {

    const [themes] = useState<Theme[]>([
        {
            title: "Space Odyssey",
            description: "A journey through the cosmos.",
            image: SpaceOdysseyIcon,
            tags: ["SPACE", "ADVENTURE"],
            difficulty: 4,
            voteCount: 7,
        },
        {
            title: "Underwater World",
            description: "Explore the depths of the ocean.",
            image: UnderwaterWorldIcon,
            tags: ["OCEAN", "EXPLORATION"],
            difficulty: 2,
            voteCount: 27,
        },
        {
            title: "Cyberpunk City",
            description: "A neon-lit metropolis.",
            image: CyberpunkCityIcon,
            tags: ["CITY", "FUTURISTIC"],
            difficulty: 6,
            voteCount: 52,
        },
    ]);

    
    return(
        <div className="theme-container">
            <div className="theme-header">
                <h1>POTIENTIAL THEME</h1>
                <p>VOTE FOR YOUR FAVORITE THEME</p>
            </div>
            <div className="theme-list">
                {themes.slice().reverse().map((theme, index) => (
                    <ThemeCard index={index} theme={theme} />
                ))}
            </div>
            <div className="prize-container">
                <h2>PRIZES</h2>
                <div className="podium-holder">
                    <div className="podium">

                        <div className="podium-item silver">2nd</div>
                        <div className="podium-item gold">1st</div>
                        <div className="podium-item bronze">3rd</div>
                    </div>
                    <div className="podium-text">
                        <p>500$</p>
                        <p>1000$</p>
                        <p>250$</p>
                    </div>
                </div>
            </div>

        </div>
    );
}