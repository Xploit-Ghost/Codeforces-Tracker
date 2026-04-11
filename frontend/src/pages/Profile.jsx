import { useState } from 'react';
import axios from 'axios';

// Dynamic Vercel backend URL fallback
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Profile() {
  // Input starts completely blank
  const [handle, setHandle] = useState(''); 
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async (e) => {
    e.preventDefault();
    if (!handle) return;
    
    setLoading(true);
    setError('');
    setProfileData(null);

    try {
      // Hardcoded localhost removed
      const response = await axios.get(`${BACKEND_URL}/api/profile/${handle}`);
      setProfileData(response.data);
    } catch (err) {
      setError('Failed to fetch profile. Please check the handle and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Solo Profile</h1>
      </header>

      <form onSubmit={fetchProfile} className="search-form">
        <input 
          type="text" 
          placeholder="Enter Codeforces Handle" 
          value={handle} 
          onChange={(e) => setHandle(e.target.value)} 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {profileData && (
        <div className="dashboard">
          <div className="card stat-card">
            <h2>{profileData.handle}</h2>
            <div className="big-stat" style={{ color: 'var(--accent)' }}>
              {profileData.rating || 'Unrated'}
            </div>
            <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>
              {profileData.rank || 'Unknown Rank'}
            </p>
            <div className="contest-stats-row" style={{ marginTop: '1.5rem' }}>
              <div className="c-stat">
                <span>Max Rating</span>
                <strong>{profileData.maxRating || 'N/A'}</strong>
              </div>
              <div className="c-stat">
                <span>Max Rank</span>
                <strong style={{textTransform: 'capitalize'}}>{profileData.maxRank || 'N/A'}</strong>
              </div>
              <div className="c-stat">
                <span>Contribution</span>
                <strong style={{ color: profileData.contribution > 0 ? '#50fa7b' : 'inherit' }}>
                  {profileData.contribution || 0}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
