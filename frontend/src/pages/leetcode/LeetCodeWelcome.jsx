
import React from 'react';
export default function LeetCodeWelcome() {
  return (
    <div className="page-container">
      <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#FFA116' }}>LeetCode Hub</h1>
        <p className="subtitle" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Your central dashboard for LeetCode. Track your Grind 75 progress, analyze your contest ratings, and fetch the daily problem.
        </p>
      </div>
    </div>
  );
}