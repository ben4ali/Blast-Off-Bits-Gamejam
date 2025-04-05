import React, { useEffect, useRef } from "react";
import "../styles/style-planning.css";
import { Day } from "../types/day";
import { DayComponent } from "./planning/DayComponent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BluePlanet from "../assets/images/BluePlanet.png"
import GreenPlanet from "../assets/images/GreenPlanet.png"
import RedPlanet from "../assets/images/RedPlanet.png"
import YellowPlanet from "../assets/images/YellowPlanet.png"

gsap.registerPlugin(ScrollTrigger);

export const PlanningComponent = () => {
    const shipRef = useRef<HTMLDivElement>(null);
    const particleContainerRef = useRef<HTMLDivElement>(null);

    const days: Day[] = [
        {
            title: "Day 1",
            description: "BLAST OFF INTO THE GAME JAM",
            plannings: [
                { time: "10:00 AM", description: "Opening Ceremony & Welcome" },
                { time: "11:00 AM", description: "Jam Kickoff - Development Begins" },
                { time: "04:00 PM", description: "Optional Check-in & Tips Session" },
                { time: "08:00 PM", description: "Progress Showcase (Discord)" },
            ],
        },
        {
            title: "Day 2",
            description: "CRUISING THROUGHT THE JAM",
            plannings: [
                { time: "09:00 AM", description: "Pixel Art Workshop (Optional)" },
                { time: "11:00 AM", description: "Halfway Point Check-in" },
                { time: "01:00 PM", description: "Game Audio Session (Optional)" },
                { time: "02:00 PM", description: "Group Game Testing" },
            ],
        },
        {
            title: "Day 3",
            description: "FINAL HYPERSPACE JUMP",
            plannings: [
                { time: "10:00 AM", description: "Final Preparations and Polishing" },
                { time: "11:00 AM", description: "Bug Fixing and Optimization" },
                { time: "12:00 PM", description: "Submission Deadline Approaching" },
                { time: "12:00 PM", description: "Final Submission and Wrap-up" },
            ],
        },
        {
            title: "Day 4",
            description: "ARRIVAL AT THE DESTINATION",
            plannings: [
                { time: "09:00 AM", description: "Post-Jam Feedback Session" },
                { time: "10:00 AM", description: "Game Showcase and Playtesting" },
                { time: "11:00 AM", description: "Game judging and Voting" },
                { time: "12:00 PM", description: "Awards Ceremony" },
            ],
        },
    ];

    useEffect(() => {
        if (shipRef.current) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".planning-content",
                    start: "top 50%",
                    end: "bottom 0%",
                    scrub: true,
                },
            })
                .to(shipRef.current, { left: "80%", top:"25%", duration: 2, ease:"sine.inOut" })
                .to(shipRef.current, { left: "0%",top:"50%", duration: 2, ease:"sine.inOut" })
                .to(shipRef.current, { left: "80%",top:"75%", duration: 2, ease:"sine.inOut" }) 
                .to(shipRef.current, { left: "50%",top:"100%", duration: 2, ease:"sine.inOut" })
                .to(shipRef.current, { left: "50%",top:"100%", duration: 2, ease:"sine.inOut" })
            }
        const interval = setInterval(() => {
            if (shipRef.current && particleContainerRef.current) {
                const particle = document.createElement("div");
                particle.className = "comet-particle";

                const shipRect = shipRef.current.getBoundingClientRect();
                const containerRect = particleContainerRef.current.getBoundingClientRect();
                particle.style.left = `${shipRect.left + shipRect.width / 2 - containerRect.left + gsap.utils.random(-15, 15)}px`;
                particle.style.top = `${shipRect.top + shipRect.height / 2 - containerRect.top + gsap.utils.random(-15, 15)}px`;

                particleContainerRef.current.appendChild(particle);

                gsap.to(particle, {
                    opacity: 0,
                    scale: 0.5,
                    duration: 1,
                    onComplete: () => {
                        particle.remove();
                    },
                });
            }
        }, 15);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="planning-container">
            <div className="planning-title">PLANNING</div>
            <div className="planning-content">
                <div ref={particleContainerRef} className="particle-container"></div>
                <div ref={shipRef} className="space-ship"></div>
                <div className="planet-container">
                    <img className="planet" src={BluePlanet} alt="Blue Planet" />
                    <img className="planet" src={GreenPlanet} alt="Green Planet" />
                    <img className="planet" src={RedPlanet} alt="Red Planet" />
                    <img className="planet" src={YellowPlanet} alt="Yellow Planet" />

                </div>
                {days.map((day, index) => (
                    <DayComponent key={index} index={index} day={day} />
                ))}
            </div>
        </div>
    );
};