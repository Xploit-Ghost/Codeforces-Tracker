import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

export default function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      {/* Top Navbar */}
      <div className="landing-navbar">
        <div className="landing-logo">CP-Tracker</div>
        <button className="landing-enter-button" onClick={() => navigate('/welcome')}>
          Enter Sign-In / Homepage
        </button>
      </div>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to<br/>CP-Tracker</h1>
          <p className="hero-subtitle">The Ultimate Analytics Platform for Competitive Programmers</p>
          <div className="scroll-indicator">
            <span>Discover More</span>
            <div className="arrow-down">▼</div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="landing-section">
        <div className="landing-card">
          <h2>The Struggle is Real</h2>
          <ul className="problem-list">
            <li><strong>Fragmented Progress:</strong> Tracking performance across Codeforces, LeetCode, and AtCoder requires constantly visiting multiple platforms.</li>
            <li><strong>Lack of Deep Analytics:</strong> Finding out which specific topics you are weak in is tedious and manual.</li>
            <li><strong>Solo Grind:</strong> Competitive programming can feel isolating without easy ways to directly compare stats or rival friends.</li>
            <li><strong>Blind Practice:</strong> Solving problems randomly instead of targeting the exact rating and tags you need to improve.</li>
          </ul>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="landing-section">
        <div className="landing-card">
          <h2>How CP-Tracker Solves It</h2>
          <ul className="solution-list">
            <li><strong>Unified Dashboard:</strong> View your Codeforces, LeetCode, and AtCoder stats in one seamless, glassmorphic interface.</li>
            <li><strong>Advanced Analytics:</strong> Auto-generated radar charts, heatmaps, and rating distributions to quickly pinpoint your strengths and weaknesses.</li>
            <li><strong>Rivalry Mode:</strong> Compare your stats head-to-head against friends. Find out exactly which problems they've solved that you haven't!</li>
            <li><strong>Smart Practice:</strong> Generate custom mashups, get random problems within a specific rating range, and filter by tags instantly.</li>
          </ul>
        </div>
      </section>

      {/* Footer / Author Section */}
      <footer className="landing-footer">
        <div className="footer-content">
          <h3>Made by Anvesh Anand Pol</h3>
          <p>Passionate Developer & Competitive Programmer</p>
          <div className="social-links">
            <a href="https://github.com/Xploit-Ghost" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/anvesh-anand-pol" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
