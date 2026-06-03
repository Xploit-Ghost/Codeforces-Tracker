
import React from 'react';
import { Link } from 'react-router-dom';

export default function LeetCodeWelcome() {
  return (
    <div className="page-container" style={{ padding: '2rem 5%' }}>
      <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#FFA116' }}>LeetCode Hub</h1>
        <p className="subtitle" style={{ fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto', color: '#ccc', lineHeight: '1.6' }}>
          Your ultimate central dashboard for LeetCode. Track your Grind 75 progress, analyze your contest ratings, and fetch the daily problem without leaving the platform.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#FFA116', marginBottom: '1rem' }}>🧠 Blind 75 / Grind 75</h3>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Access the most essential curated list of LeetCode problems covering Arrays, Graphs, DP, and more to prepare for your interviews.</p>
          <Link to="/leetcode/blind75" style={{ color: '#FFA116', textDecoration: 'none', fontWeight: 'bold' }}>Explore List &rarr;</Link>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#FFA116', marginBottom: '1rem' }}>🔍 Advanced User Tracking</h3>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Look up any LeetCode ID to instantly see their Global Ranking, Reputation, and exactly how many Easy/Medium/Hard problems they've solved.</p>
          <Link to="/leetcode/lookup" style={{ color: '#FFA116', textDecoration: 'none', fontWeight: 'bold' }}>Find a User &rarr;</Link>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#FFA116', marginBottom: '1rem' }}>🏆 Contest & Badges</h3>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Deep-dive into a user's contest rating history, top percentage, and view all the visual badges they have earned over time.</p>
          <Link to="/leetcode/contest" style={{ color: '#FFA116', textDecoration: 'none', fontWeight: 'bold' }}>View Ratings &rarr;</Link>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#FFA116', marginBottom: '1rem' }}>📅 Daily & Random</h3>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Instantly fetch today's official LeetCode Daily Challenge or roll the dice to jump into a random essential problem.</p>
          <Link to="/leetcode/daily" style={{ color: '#FFA116', textDecoration: 'none', fontWeight: 'bold' }}>Get Today's Problem &rarr;</Link>
        </div>

      </div>
    </div>
  );
}