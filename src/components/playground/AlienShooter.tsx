import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import spaceShip from "../../assets/images/spaceShip.png";
import alienShip from "../../assets/images/alienShip.png";


export const AlienShooter = () => {
    const [score, setScore] = useState(0);
    const shipRef = useRef<HTMLDivElement>(null);
    const aliensRef = useRef<HTMLDivElement[]>([]);
    const bulletsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        shipRef.current?.style.setProperty("background-image", `url(${spaceShip})`);
        const spawnInterval = setInterval(() => {
            spawnAlien();
        }, 600);

        return () => clearInterval(spawnInterval);
    }, []);

    const spawnAlien = () => {
        const alien = document.createElement("div");
        alien.className = "alien";
        alien.style.backgroundImage = `url(${alienShip})`;
        alien.style.left = `${Math.random() * 40}rem`;
        alien.style.top = "-6rem";
        document.querySelector(".screen-alien")?.appendChild(alien);

        gsap.to(alien, {
            y: "55rem",
            duration: 5,
            onUpdate: () => checkCollision(alien),
            onComplete: () => {
                alien.remove();
            },
        });

        aliensRef.current.push(alien);
    };

    const shipHitEffect = () => {
        const ship = shipRef.current;
        if (ship) {
            gsap.to(ship, {
                opacity: 0.1,
                duration: 0.1,
                onComplete: () => {
                    gsap.to(ship, {
                        opacity: 0.5,
                        duration: 0.1,
                        onComplete: () => {
                            gsap.to(ship, {
                                opacity: 1,
                                duration: 0.1,
                                onComplete: () => {
                                    gsap.to(ship, {
                                        opacity: 0.5,
                                        duration: 0.1,
                                        onComplete: () => {
                                            gsap.to(ship, {
                                                opacity: 1,
                                                duration: 0.1,
                                            });
                                        },
                                    });
                                }
                            });
                        },
                    });
                },
            });
        }
    }

    const alienHitffect = (alien: HTMLDivElement) => {
        gsap.killTweensOf(alien);
        gsap.to(alien, {
            rotation: 720,
            scale: 0.5,
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
                alien.remove();
            },
        });
    }

    const shootBullet = () => {
        const bullet = document.createElement("div");
        bullet.className = "bullet";
        const ship = shipRef.current;
        if (ship) {
            const shipRect = ship.getBoundingClientRect();
            const screen = document.querySelector(".screen-alien");
            if (screen) {
                const screenRect = screen.getBoundingClientRect();
                bullet.style.left = `${shipRect.left + shipRect.width / 2 - screenRect.left}px`;
                bullet.style.top = `${shipRect.top - screenRect.top}px`;
                screen.appendChild(bullet);

                gsap.to(bullet, {
                    y: "-30rem",
                    duration: 0.5,
                    onUpdate: () => checkBulletCollision(bullet),
                    onComplete: () => bullet.remove(),
                });

                bulletsRef.current.push(bullet);
            }
        }
    };

    const checkCollision = (alien: HTMLDivElement) => {
        const ship = shipRef.current;
        if (ship) {
            const shipRect = ship.getBoundingClientRect();
            const alienRect = alien.getBoundingClientRect();

            if (
                alienRect.left < shipRect.right &&
                alienRect.right > shipRect.left &&
                alienRect.top < shipRect.bottom &&
                alienRect.bottom > shipRect.top
            ) {
                alien.remove();
                shipHitEffect();
            }
        }
    };

    const checkBulletCollision = (bullet: HTMLDivElement) => {
        aliensRef.current.forEach((alien, index) => {
            const alienRect = alien.getBoundingClientRect();
            const bulletRect = bullet.getBoundingClientRect();

            if (
                bulletRect.left < alienRect.right &&
                bulletRect.right > alienRect.left &&
                bulletRect.top < alienRect.bottom &&
                bulletRect.bottom > alienRect.top
            ) {
                alienHitffect(alien);
                bullet.remove();
                aliensRef.current.splice(index, 1);
                setScore((prev) => prev + 1);
            }
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const ship = shipRef.current;
        if (ship) {
            const screen = document.querySelector(".screen-alien");
            if (screen) {
                const screenRect = screen.getBoundingClientRect();
                const shipWidth = ship.offsetWidth;
                const offset = 5;
                let newLeft = e.clientX - shipWidth / 2 + offset;

                if (newLeft < screenRect.left) newLeft = screenRect.left;
                if (newLeft + shipWidth > screenRect.right) newLeft = screenRect.right - shipWidth;

                ship.style.left = `${newLeft - screenRect.left}px`;
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "e") {
                e.preventDefault();
                shootBullet();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div
            className="alien-shooter-holder"
            onMouseMove={handleMouseMove}
        >
            <h3>% ALIEN INVASION ®</h3>
            <div className="screen screen-alien">
                <div className="ship" ref={shipRef}></div>
                <div className="scoreboard">
                    <p>SCORE {score}</p>
                </div>
                <div className="controller-help">
                    <p>E TO SHOOT • MOVE MOUSE TO CONTROL SHIP</p>
                </div>
            </div>
        </div>
    );
};