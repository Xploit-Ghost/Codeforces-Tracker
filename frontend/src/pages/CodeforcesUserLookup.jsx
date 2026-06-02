import React, { useState } from 'react';
import '../App.css';

export default function CodeforcesUserLookup() {
  const [handle, setHandle] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const data = await res.json();
      if (data.status === 'OK') {
        setUser(data.result[0]);
      } else {
        setError(data.comment || "User not found");
      }
    } catch (err) {
      setError("Failed to fetch data");
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2>🔍 Find Codeforces User</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>Quickly lookup any handle on Codeforces</p>
        
        <form onSubmit={fetchUser} style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Enter CF handle..." 
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {user && (
          <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '12px', marginTop: '1rem' }}>
            <img src={user.titlePhoto} alt={user.handle} style={{ width: '150px', height: '150px', borderRadius: '50%', border: '4px solid #333' }} />
            <h3 style={{ marginTop: '1rem', fontSize: '1.5rem', color: user.rating >= 2400 ? '#FF0000' : user.rating >= 1900 ? '#FF8CC6' : '#FFD700' }}>
              {user.rank ? user.rank : 'Unrated'}
            </h3>
            <h2>{user.handle}</h2>
            {user.firstName && <p>{user.firstName} {user.lastName}</p>}
            
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem', borderTop: '1px solid #444', paddingTop: '1rem' }}>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Current Rating</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.rating || 0}</p>
              </div>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Max Rating</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.maxRating || 0}</p>
              </div>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Contribution</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: user.contribution > 0 ? '#4CAF50' : '#FF5252' }}>{user.contribution}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
