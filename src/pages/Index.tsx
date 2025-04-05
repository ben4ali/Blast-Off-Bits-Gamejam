import { useEffect, useRef } from "react";
import "../styles/style-background.css";
import { gsap } from "gsap";
import { HeroComponent } from "../components/HeroComponent";
import { NavbarComponent } from "../components/NavbarComponent";
import { ThemeComponent } from "../components/ThemeComponent";

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      const container = mainRef.current;
      const starCount = 50;

      const existingStars = container.querySelectorAll(
        ".star:not(.shooting-star)"
      );
      existingStars.forEach((star) => star.remove());

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        container.appendChild(star);
      }

      const createShootingStar = () => {
        const star = document.createElement("div");
        star.className = "shooting-star";

        const startX = Math.random() * window.innerWidth;
        star.style.left = `${startX}px`;
        star.style.top = "0px";

        container.appendChild(star);

        gsap.to(star, {
          x: -500 - Math.random() * 300,
          y: 500 + Math.random() * 500,
          duration: 1 + Math.random() * 2,
          ease: "power1.in",
          opacity: 0,
          onComplete: () => {
            star.remove();
            setTimeout(createShootingStar, Math.random() * 3000 + 2000);
          },
        });
      };

      for (let i = 0; i < 3; i++) {
        setTimeout(createShootingStar, Math.random() * 3000);
      }
    }
  }, []);

  return (
    <div ref={mainRef} className="index-container space-gradient">
      {/* TV SCREEN BACKGROUND */}
      <div className="background-lines"></div>

      {/* GRID BACKGROUND */}
      <div className="grid-bg"></div>

      {/* SCANNER RIDER */}
      <div className="arcade-scanner"></div>
      <div className="arcade-scanner-2"></div>

      <NavbarComponent />
      <div className="spacer"></div>
      <section id="hero-section">
        <HeroComponent />
      </section>
      <section id="theme-section">
        <ThemeComponent />
    </section>
    </div>
  );
};

export default Index;
