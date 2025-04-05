import React from "react";
import "../styles/style-navbar.css";

export const NavbarComponent = () => {
    return(
        <div className="navbar-container">
            <h1>BLAST OFF BITS</h1>
            <div className="navbar-links">
                <a href="#home">Home</a>
                <a href="#games">Games</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    )
}