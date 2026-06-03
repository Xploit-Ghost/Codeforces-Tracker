import React from 'react';
import './StartScreen.css';

export default function StartScreen({ onReady }) {
  return (
    <div className="start-screen-container">
      <div className="start-screen-content">
        <h1 className="start-screen-title">Welcome to<br/>CP-Tracker</h1>
        <p className="start-screen-subtitle">Made by Anvesh Anand Pol</p>
        <button className="start-screen-button" onClick={onReady}>
          Enter Sign-In / Homepage
        </button>
      </div>
    </div>
  );
}
