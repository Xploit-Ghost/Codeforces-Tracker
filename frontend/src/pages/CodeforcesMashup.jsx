import React, { useState, useEffect } from 'react';
import '../App.css';

export default function CodeforcesMashup() {
  const [contest, setContest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateMashup = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://codeforces.com/api/problemset.problems');
      const data = await res.json();
      if (data.status === 'OK') {
        const problems = data.result.problems.filter(p => p.rating);
        
        // Pick problems from different rating brackets
        const brackets = [
          problems.filter(p => p.rating >= 800 && p.rating <= 1000),
          problems.filter(p => p.rating >= 1100 && p.rating <= 1300),
          problems.filter(p => p.rating >= 1400 && p.rating <= 1600),
          problems.filter(p => p.rating >= 1700 && p.rating <= 1900)
        ];

        const generated = brackets.map(bracket => {
          if (bracket.length === 0) return null;
          return bracket[Math.floor(Math.random() * bracket.length)];
        }).filter(p => p !== null);

        setContest(generated);
      } else {
        setError("Failed to fetch problemset.");
      }
    } catch (err) {
      setError("Network error fetching problems.");
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2>🎯 Mashup Generator</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>Generate a random 4-problem virtual contest with scaling difficulty.</p>
        
        <button className="primary-button" onClick={generateMashup} disabled={loading} style={{ marginBottom: '2rem' }}>
          {loading ? 'Generating Contest...' : 'Generate New Contest 🎲'}
        </button>

        {error && <div className="error-message">{error}</div>}

        {contest.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            {contest.map((p, index) => (
              <div key={p.contestId + p.index} style={{ backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', borderLeft: `4px solid ${['#4CAF50', '#FFD700', '#FF9800', '#FF5252'][index]}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>
                    <span style={{ color: '#aaa', marginRight: '1rem' }}>Problem {String.fromCharCode(65 + index)}</span>
                    <a href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                      {p.name}
                    </a>
                  </h3>
                  <span style={{ backgroundColor: '#333', padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: 'bold', color: '#ffb86c' }}>
                    Rating: {p.rating}
                  </span>
                </div>
                <div style={{ marginTop: '0.8rem', color: '#888', fontSize: '0.9rem' }}>
                  Tags: {p.tags.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
