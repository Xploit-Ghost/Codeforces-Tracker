import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RenderLoader from './RenderLoader';
import './StartScreen.css';

export default function StartScreen() {
  const navigate = useNavigate();
  const [isWakingUp, setIsWakingUp] = useState(false);

  const handleEnterClick = () => {
    setIsWakingUp(true);
  };

  const handleRenderReady = () => {
    navigate('/welcome');
  };

  if (isWakingUp) {
    return <RenderLoader onReady={handleRenderReady} />;
  }

  return (
    <div className="landing-page-container">
      {/* Top Navbar */}
      <div className="landing-navbar">
        <div className="landing-logo">CP-Tracker</div>
        <button className="landing-enter-button" onClick={handleEnterClick}>
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

      {/* Deep Dive 1 */}
      <section className="landing-section">
        <div className="landing-card deep-dive-card">
          <div className="deep-dive-header">
            <span className="feature-icon-large">📊</span>
            <h2>Comprehensive Visual Analytics</h2>
          </div>
          <p className="deep-dive-intro">Stop guessing where your weak spots are. CP-Tracker’s state-of-the-art analytics engine transforms raw submission data into beautiful, interactive data visualizations that highlight your exact progress.</p>
          <div className="deep-dive-details">
            <div className="detail-point">
              <h4>Radar Charts & Tag Distributions</h4>
              <p>Instantly see how your skills map across Dynamic Programming, Graphs, Math, Data Structures, and more. Visually identify which topics need your immediate attention.</p>
            </div>
            <div className="detail-point">
              <h4>Submission Heatmaps</h4>
              <p>Track your daily consistency, just like a GitHub contribution graph. Maintain your streak and stay motivated to solve problems every single day.</p>
            </div>
            <div className="detail-point">
              <h4>Rating Histograms</h4>
              <p>A detailed breakdown of every accepted problem by its Codeforces rating. Know your comfort zone and gradually push into higher difficulty tiers.</p>
            </div>
            <div className="detail-point">
              <h4>Language Preference Pies</h4>
              <p>Analyze your language usage history (C++, Python, Java) to see how your tech stack evolves over time as you tackle different types of problems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive 2 */}
      <section className="landing-section">
        <div className="landing-card deep-dive-card">
          <div className="deep-dive-header">
            <span className="feature-icon-large">⚔️</span>
            <h2>Rivalry Mode & Friend Tracking</h2>
          </div>
          <p className="deep-dive-intro">Competitive programming is better with friends. Our platform makes it incredibly easy to track your peers and use their progress to fuel your own growth and motivation.</p>
          <div className="deep-dive-details">
            <div className="detail-point">
              <h4>Head-to-Head Comparisons</h4>
              <p>Directly compare your current rating, max rating, and total solved problems against any friend in a sleek, side-by-side versus screen.</p>
            </div>
            <div className="detail-point">
              <h4>The "Upsolve List" Generator</h4>
              <p>Our proprietary rivalry algorithm cross-references your solved problems with your friend's. It instantly generates a list of unique problems <strong>they</strong> have solved that <strong>you</strong> haven't touched yet.</p>
            </div>
            <div className="detail-point">
              <h4>Latest Activity Feed</h4>
              <p>Keep a close eye on what problems your friends are currently solving and passing. A live feed of their latest triumphs keeps the competitive spirit alive.</p>
            </div>
            <div className="detail-point">
              <h4>Global Friend Network</h4>
              <p>Manage a curated list of rivals. Seamlessly jump between their profiles to study their problem-solving trajectories and learn from their success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive 3 */}
      <section className="landing-section">
        <div className="landing-card deep-dive-card">
          <div className="deep-dive-header">
            <span className="feature-icon-large">🎯</span>
            <h2>Precision Problem Fetcher</h2>
          </div>
          <p className="deep-dive-intro">Blindly clicking "Random Problem" on Codeforces is a massive waste of time. Our precision fetcher ensures you stay exactly in your optimal Zone of Proximal Development.</p>
          <div className="deep-dive-details">
            <div className="detail-point">
              <h4>Exact Rating Boundaries</h4>
              <p>Set a precise minimum and maximum rating (e.g., 1400 to 1600). The engine will only fetch problems that fall strictly within your optimal training zone.</p>
            </div>
            <div className="detail-point">
              <h4>Multi-Tag Filtering</h4>
              <p>Select specific tags like "dp", "greedy", or "graphs". Combine this with rating filters to instantly fetch exactly the kind of practice you need right now.</p>
            </div>
            <div className="detail-point">
              <h4>Custom Mashup Generator</h4>
              <p>Preparing for a contest? Generate custom, printable mashup lists of problems tailored to your current level to simulate a real competitive environment.</p>
            </div>
            <div className="detail-point">
              <h4>Smart Anti-Duplication</h4>
              <p>The fetcher cross-references your Codeforces handle to ensure it <strong>never</strong> suggests a problem you have already solved or attempted before.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive 4 */}
      <section className="landing-section">
        <div className="landing-card deep-dive-card">
          <div className="deep-dive-header">
            <span className="feature-icon-large">🌐</span>
            <h2>Unified Dashboards & DSA Tracking</h2>
          </div>
          <p className="deep-dive-intro">Why limit yourself to just one site? CP-Tracker brings the entire programming universe into one unified, glassmorphic command center.</p>
          <div className="deep-dive-details">
            <div className="detail-point">
              <h4>Multi-Platform Support</h4>
              <p>Access your Codeforces, LeetCode (Daily Challenges, Blind 75), and AtCoder statistics without ever leaving the application.</p>
            </div>
            <div className="detail-point">
              <h4>Interactive DSA Roadmap</h4>
              <p>A built-in Data Structures and Algorithms tracking graph. Follow a structured path from Arrays to Advanced Graph Theory, checking off topics as you master them.</p>
            </div>
            <div className="detail-point">
              <h4>Live Global Status</h4>
              <p>View a live feed of submissions happening globally across Codeforces. Watch what the highest-rated users are solving in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Author Section */}
      <footer className="landing-footer">
        <div className="footer-content-wrapper">
          
          <div className="footer-left">
            <h3>Made by Anvesh Anand Pol</h3>
            <p>Passionate Developer & Competitive Programmer</p>
            <div className="social-links-left">
              <a href="https://github.com/Xploit-Ghost" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/anveshpol1522008" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

          <div className="footer-right-corner">
            <span style={{ color: '#888', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Great thanks to:</span>
            <h4 style={{ color: '#bbb', margin: '0 0 1rem 0', fontSize: '1.2rem', fontFamily: 'Space Grotesk' }}>Pranshu Pujara</h4>
            <div className="social-links-small">
              <a href="https://github.com/PranshuPujara" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://in.linkedin.com/in/pranshu-pujara-2a0564376" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
