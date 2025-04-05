import React from 'react';
import "../styles/style-playground.css";
import { AlienShooter } from './playground/AlienShooter';


export const PlaygroundComponent = () => {
    return (
        <div className="playground-container">
            <h1>PLAYGROUND</h1>
            <div className="playground-content">
                <div className='alien-shooter-container'>
                    <AlienShooter />
                </div>
            </div>
        </div>
    );
}