
import React, { useState } from 'react';
export default function LeetCodeUserLookup() {
  const [handle, setHandle] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUser = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      // Fetch user profile and solved counts simultaneously
      const [profileRes, solvedRes] = await Promise.all([
        fetch(`https://alfa-leetcode-api.onrender.com/${handle}`),
        fetch(`https://alfa-leetcode-api.onrender.com/${handle}/solved`)
      ]);
      
      const profileData = await profileRes.json();
      const solvedData = await solvedRes.json();

      if (profileData.errors || profileData.error) {
        setError("User not found");
      } else {
        // Merge the two datasets
        setUser({
          ...profileData,
          easySolved: solvedData.easySolved || 0,
          mediumSolved: solvedData.mediumSolved || 0,
          hardSolved: solvedData.hardSolved || 0,
        });
      }
    } catch (err) {
      setError("Failed to fetch from ALFA API");
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#FFA116' }}>🔍 Find LeetCoder</h2>
        <form onSubmit={searchUser} style={{ display: 'flex', gap: '10px', margin: '2rem 0' }}>
          <input type="text" className="search-input" placeholder="Enter Leetcode ID..." value={handle} onChange={(e) => setHandle(e.target.value)} style={{ flex: 1 }} />
          <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {user && (
          <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px' }}>
            <img src={user.avatar} alt="avatar" style={{ width: '100px', borderRadius: '12px' }} />
            <h2 style={{ marginTop: '1rem' }}>{user.name || user.username}</h2>
            <p>Rank: <strong>{user.ranking.toLocaleString()}</strong> | Reputation: <strong>{user.reputation}</strong></p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ color: '#00b8a3' }}><h3>Easy</h3><p>{user.easySolved}</p></div>
              <div style={{ color: '#ffc01e' }}><h3>Medium</h3><p>{user.mediumSolved}</p></div>
              <div style={{ color: '#ff375f' }}><h3>Hard</h3><p>{user.hardSolved}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}