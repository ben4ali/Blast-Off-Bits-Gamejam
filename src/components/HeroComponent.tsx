import React, { useEffect, useRef, useState } from "react";
import "../styles/style-hero.css";
import { Countdown } from "./hero/Countdown";
import { ArrowDown } from "lucide-react";
import * as THREE from "three";

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

    const threeContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (threeContainerRef.current) {
            threeContainerRef.current.appendChild(renderer.domElement);
        }

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: "rgb(86, 168, 240)", wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.set(-2.35, 0.9, 0);
        cube.scale.set(0.85, 0.85, 0.85);

        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
        };
    }, []);

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
                    <a className="btn-pixel signup">SIGN UP</a>
                    <a className="btn-pixel explore">EXPLORE</a>
                </div>

                <Countdown />
            </div>

       

            <div className="screen screen-hero">
                <div ref={threeContainerRef} className="three-container"></div>
            </div>
            <div className="scroll-down">
                <p>SCROLL</p>
                <ArrowDown className="arrow-down" size={24} color="var(--accent)" />
            </div>
        </div>
    );
};