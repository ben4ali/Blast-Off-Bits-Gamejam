import React from "react";
import "../styles/style-footer.css"

export const FooterComponent = () => {
    return(
        <div className="footer-container">
            <div className="footer-content">
                <div className="author">
                    <h4>ALI BENKARROUCH</h4>
                    <p>COMPUTER SCIENCE STUDENT</p>
                </div>
                <div className="info-links">
                    <div className="footer-link">
                        <a href="#" className="facebook">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="github">
                            <i className="bi bi-github"></i>
                        </a>
                        <a href="#" className="discord">
                            <i className="bi bi-discord"></i>
                        </a>
                    </div>
                    <p>
                        <span>©</span> 2025 ALI BENKARROUCH. <br></br> ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <h5>
                    PRESS <span>START</span> TO CONTINUE
                </h5>
                <div className="controllers-buttons">
                    <span>A</span>
                    <span>B</span>
                    <span>X</span>
                    <span>Y</span>
                </div>
            </div>
        </div>
    )
}