import React, { useState, useEffect } from 'react';
import '../App.css';

export default function CodeforcesPopular() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await fetch('https://codeforces.com/api/user.ratedList?activeOnly=false');
        const data = await res.json();
        
        if (data.status === 'OK') {
          // The API returns users sorted by rating descending
          setUsers(data.result.slice(0, 100));
        } else {
          setError(data.comment);
        }
      } catch (err) {
        setError("Failed to fetch top users.");
      }
      setLoading(false);
    };
    
    fetchTopUsers();
  }, []);

  const getRankColor = (rating) => {
    if (rating >= 3000) return '#FF0000'; // Legendary Grandmaster
    if (rating >= 2600) return '#FF3333'; // International Grandmaster
    if (rating >= 2400) return '#FF7777'; // Grandmaster
    if (rating >= 2300) return '#FFBB55'; // International Master
    if (rating >= 2100) return '#FFCC88'; // Master
    if (rating >= 1900) return '#FF88FF'; // Candidate Master
    if (rating >= 1600) return '#AAAAFF'; // Expert
    if (rating >= 1400) return '#77DDBB'; // Specialist
    if (rating >= 1200) return '#77FF77'; // Pupil
    return '#CCCCCC'; // Newbie
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2>🔥 Hall of Fame</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>The Top 100 highest-rated Codeforces users of all time.</p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Fetching Codeforces Legends...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                  <th style={{ padding: '1rem' }}>Rank</th>
                  <th style={{ padding: '1rem' }}>User</th>
                  <th style={{ padding: '1rem' }}>Rating</th>
                  <th style={{ padding: '1rem' }}>Max Rating</th>
                  <th style={{ padding: '1rem' }}>Title</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.handle} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: index < 3 ? '#FFD700' : '#fff' }}>#{index + 1}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                      <a href={`https://codeforces.com/profile/${user.handle}`} target="_blank" rel="noreferrer" style={{ color: getRankColor(user.rating), textDecoration: 'none' }}>
                        {user.handle}
                      </a>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                      <span style={{ color: getRankColor(user.rating) }}>{user.rating}</span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                      {user.maxRating}
                    </td>
                    <td style={{ padding: '1rem', textTransform: 'capitalize', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {user.rank || 'Unrated'}
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
