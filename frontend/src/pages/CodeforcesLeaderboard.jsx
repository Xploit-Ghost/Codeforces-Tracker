import React, { useState, useEffect } from 'react';
import '../App.css';

export default function CodeforcesLeaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=false');
        const data = await res.json();
        if (data.status === 'OK') {
          // Top 100 users
          setUsers(data.result.slice(0, 100));
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>🏆 Global Codeforces Leaderboard</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>The top 100 highest rated active competitive programmers in the world.</p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading global ranks...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #444', backgroundColor: '#1a1a1a' }}>
                  <th style={{ padding: '1rem' }}>Rank</th>
                  <th style={{ padding: '1rem' }}>Handle</th>
                  <th style={{ padding: '1rem' }}>Rating</th>
                  <th style={{ padding: '1rem' }}>Title</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={u.handle} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>#{index + 1}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: u.rating >= 2400 ? '#FF0000' : u.rating >= 2100 ? '#FF8CC6' : '#FFD700' }}>
                      <a href={`https://codeforces.com/profile/${u.handle}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {u.handle}
                      </a>
                    </td>
                    <td style={{ padding: '1rem' }}>{u.rating}</td>
                    <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{u.rank}</td>
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
