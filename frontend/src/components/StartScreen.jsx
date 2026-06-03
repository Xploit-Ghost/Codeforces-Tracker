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
            <li><strong>Lost Track of Upsolving:</strong> Forgetting to upsolve problems you couldn't solve during live contests.</li>
            <li><strong>Time Management Issues:</strong> Struggling to find time-appropriate problems for short, intense practice sessions.</li>
            <li><strong>Inconsistent Motivation:</strong> Losing the drive to solve problems without visual gamification or a clear roadmap.</li>
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
            <li><strong>Dedicated Upsolve Tracking:</strong> Specialized sections to easily find and conquer problems you missed in past contests.</li>
            <li><strong>Time-Boxed Sessions:</strong> Daily Challenges and curated lists that fit perfectly into your daily schedule.</li>
            <li><strong>Gamified Progression:</strong> Interactive graphs and progress trackers to keep you consistently motivated and locked in.</li>
          </ul>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="landing-section">
        <div className="landing-card" style={{ maxWidth: '1200px', backgroundColor: 'rgba(5, 8, 12, 0.85)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Deep Dive: Platform Features</h2>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Comprehensive Analytics</h3>
              <p>Stop guessing your weak spots. CP-Tracker generates interactive radar charts for your tag distribution, language preference pies, and detailed daily submission heatmaps. Everything you need to visually analyze your entire competitive programming journey.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚔️</div>
              <h3>Rivalry & Friend Tracking</h3>
              <p>Add friends to directly compare your stats head-to-head. Our rivalry algorithm computes unique problems solved by your friends that you haven't touched, generating a precise "Upsolve List" to help you catch up and beat the competition.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Precision Problem Fetcher</h3>
              <p>Want to practice exactly 1500-rated Dynamic Programming problems? Use the advanced randomizer and mashup generators to fetch problems that fit your exact constraints. No more relying on standard platform randomness.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌐</div>
              <h3>Unified Global Leaderboards</h3>
              <p>See exactly where you stand. Access the Hall of Fame to track the top 100 Codeforces users worldwide, or view live statuses of global submissions. Stay connected to the pulse of the competitive programming world without ever leaving the dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Author Section */}
      <footer className="landing-footer">
        <div className="footer-content-wrapper">
          <div className="footer-left">
            <span style={{ color: '#888', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Great thanks to:</span>
            <h4 style={{ color: '#bbb', margin: '0 0 1rem 0', fontSize: '1.2rem', fontFamily: 'Space Grotesk' }}>Pranshu Pujara</h4>
            <div className="social-links-small">
              <a href="https://github.com/PranshuPujara" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://in.linkedin.com/in/pranshu-pujara-2a0564376" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          
          <div className="footer-center">
            <h3>Made by Anvesh Anand Pol</h3>
            <p>Passionate Developer & Competitive Programmer</p>
            <div className="social-links">
              <a href="https://github.com/Xploit-Ghost" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/anveshpol1522008" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          
          <div className="footer-right">
             {/* Empty for flex balance */}
          </div>
        </div>
      </footer>
    </div>
  );
}
