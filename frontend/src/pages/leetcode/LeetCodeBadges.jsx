
import React, { useState } from 'react';
export default function LeetCodeBadges() {
  const [handle, setHandle] = useState('');
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${handle}/badges`);
      const data = await res.json();
      setBadges(data.badges || []);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#FFA116' }}>🏅 User Badges</h2>
        <form onSubmit={search} style={{ display: 'flex', gap: '10px', margin: '2rem 0' }}>
          <input type="text" className="search-input" placeholder="Username..." value={handle} onChange={e => setHandle(e.target.value)} style={{ flex: 1 }} />
          <button type="submit" className="primary-button" style={{ backgroundColor: '#FFA116' }}>{loading ? '...' : 'Search'}</button>
        </form>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {badges.map(b => (
            <div key={b.name} style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '8px', width: '120px' }}>
              <img src={b.icon.startsWith('http') ? b.icon : 'https://leetcode.com' + b.icon} alt={b.name} style={{ width: '60px' }} />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{b.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}