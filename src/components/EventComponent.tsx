import React, { useRef, useEffect } from "react";
import "../styles/style-event.css";
import { JamRule } from "./event-details/JamRule";
import { Rule } from "../types/rule";
import * as THREE from "three";

export const EventComponent = () => {
  const rules: Rule[] = [
    {
      title: "Time Limit",
      description: "All games must be created within the 48-hour time period",
    },
    {
      title: "Original Work",
      description: "All code and assets must be created during the jam",
    },
    {
      title: "Theme Compliance",
      description: "Games must follow the announced theme",
    },
    {
      title: "Submission",
      description:
        "Upload your game to itch.io with source code by the deadline",
    },
    {
      title: "Team Size",
      description: "Teams of 1-4 people are allowed",
    },
    {
      title: "Open Source",
      description: "All submissions will be open-source after the jam",
    },
  ];
  const threeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      (threeContainerRef.current?.clientWidth || window.innerWidth) /
        (threeContainerRef.current?.clientHeight || window.innerHeight),
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      threeContainerRef.current?.clientWidth || window.innerWidth,
      threeContainerRef.current?.clientHeight || window.innerHeight
    );
    if (threeContainerRef.current) {
      threeContainerRef.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: "rgb(86, 168, 240)",
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.set(0, 0, 0);
    cube.scale.set(0.85, 0.85, 0.85);
    camera.rotateZ(Math.PI / 2);

    camera.position.z = 1.35;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;

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
    <div className="event-container">
      <div className="event-details">
        <div className="event-details-content">
          <h4>EVENT DETAILS</h4>
          <p className="event-description">
            THE EVENT WILL TAKE PLACE ON THE 15TH OF DECEMBER 2023 AT THE
            UNIVERSITY OF XYZ. PARTICIPANTS WILL HAVE THE OPPORTUNITY TO
            SHOWCASE THEIR SKILLS IN VARIOUS COMPETITIONS.
            <br></br>
            <br></br>
            THE EVENT WILL INCLUDE A HACKATHON, WORKSHOPS, AND KEYNOTE SPEECHES
            FROM INDUSTRY EXPERTS.
          </p>
          <div className="info-card-holder">
            <div className="info-card screen">
              <h5>START DATE</h5>
              <p>JUNE 15, 2024</p>
              <p>10:00 AM EST</p>
            </div>
            <div className="info-card screen">
              <h5>END DATE</h5>
              <p>JUNE 17, 2024</p>
              <p>10:00 AM EST</p>
            </div>
            <div className="info-card screen">
              <h5>VOTING PERIOD</h5>
              <p>JUNE 17-20, 2024</p>
            </div>
            <div className="info-card screen">
              <h5>RESULTS</h5>
              <p>JUNE 22, 2024</p>
              <p>Live Stream</p>
            </div>
          </div>
          <div className="screen cube-holder" ref={threeContainerRef}></div>
        </div>
        <div className="event-rules-content">
          <h4>JAM RULES</h4>
          <div className="jam-rules">
            {rules.map((rule, index) => (
              <JamRule key={index} rule={rule} />
            ))}
          </div>
        </div>
      </div>
      <div className="event-register-form"></div>
    </div>
  );
};
