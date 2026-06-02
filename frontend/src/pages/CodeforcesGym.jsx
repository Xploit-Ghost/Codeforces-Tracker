import React, { useState, useEffect } from 'react';
import '../App.css';

export default function CodeforcesGym() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const res = await fetch('https://codeforces.com/api/contest.list?gym=true');
        const data = await res.json();
        if (data.status === 'OK') {
          // Get the 30 most recent Gym contests
          setContests(data.result.slice(0, 30));
        } else {
          setError(data.comment);
        }
      } catch (err) {
        setError("Failed to fetch Gym contests.");
      }
      setLoading(false);
    };
    fetchGym();
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2>🏋️ Gym Contests</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>Recent unrated Codeforces Gym contests for team training and practice.</p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Fetching Gym data...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #444', backgroundColor: '#1a1a1a' }}>
                  <th style={{ padding: '1rem' }}>ID</th>
                  <th style={{ padding: '1rem' }}>Contest Name</th>
                  <th style={{ padding: '1rem' }}>Difficulty</th>
                  <th style={{ padding: '1rem' }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {contests.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '1rem' }}>{c.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                      <a href={`https://codeforces.com/gym/${c.id}`} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                        {c.name}
                      </a>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        backgroundColor: c.difficulty >= 4 ? '#FF5252' : c.difficulty >= 2 ? '#FFD700' : '#4CAF50',
                        color: '#000',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '0.8rem'
                      }}>
                        {c.difficulty ? `Level ${c.difficulty}` : 'Standard'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#aaa' }}>
                      {Math.floor(c.durationSeconds / 3600)}h {(c.durationSeconds % 3600) / 60}m
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
