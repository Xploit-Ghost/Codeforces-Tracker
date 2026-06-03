
import React, { useState, useEffect } from 'react';
export default function LeetCodeDaily() {
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://alfa-leetcode-api.onrender.com/daily')
      .then(res => res.json())
      .then(data => setDaily(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#FFA116' }}>📅 Daily Challenge</h2>
        {loading ? <p>Loading...</p> : daily ? (
          <div style={{ marginTop: '2rem' }}>
            <h3>{daily.questionTitle}</h3>
            <p style={{ margin: '1rem 0', color: daily.difficulty === 'Easy' ? '#00b8a3' : daily.difficulty === 'Medium' ? '#ffc01e' : '#ff375f' }}>{daily.difficulty}</p>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Date: {daily.date}</p>
            <a href={`https://leetcode.com${daily.questionLink}`} target="_blank" rel="noreferrer" className="primary-button" style={{ backgroundColor: '#FFA116', textDecoration: 'none' }}>Solve Now</a>
          </div>
        ) : <p>Failed to fetch daily challenge.</p>}
      </div>
    </div>
  );
}