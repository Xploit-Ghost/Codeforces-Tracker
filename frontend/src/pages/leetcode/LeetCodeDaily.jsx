
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
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: '#FFA116', fontSize: '2.5rem', marginBottom: '2rem' }}>📅 Daily Challenge</h2>
        {loading ? <p style={{ fontSize: '1.5rem' }}>Loading...</p> : daily ? (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>{daily.questionTitle}</h3>
            <p style={{ margin: '1rem 0', fontSize: '1.8rem', fontWeight: 'bold', color: daily.difficulty === 'Easy' ? '#00b8a3' : daily.difficulty === 'Medium' ? '#ffc01e' : '#ff375f' }}>{daily.difficulty}</p>
            <p style={{ color: '#aaa', marginBottom: '3rem', fontSize: '1.2rem' }}>Date: {daily.date}</p>
            <a href={`https://leetcode.com${daily.questionLink}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><button>Solve Now</button></a>
          </div>
        ) : <p style={{ fontSize: '1.5rem' }}>Failed to fetch daily challenge.</p>}
      </div>
    </div>
  );
}