import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

export default function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className="start-screen-container">
      <div className="start-screen-content">
        <h1 className="start-screen-title">Welcome to<br/>CP-Tracker</h1>
        <p className="start-screen-subtitle">Made by Anvesh Anand Pol</p>
        <button className="start-screen-button" onClick={() => navigate('/welcome')}>
          Enter Sign-In / Homepage
        </button>
      </div>
    </div>
  );
}
