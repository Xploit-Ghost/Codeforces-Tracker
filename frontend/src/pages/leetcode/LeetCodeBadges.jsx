
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
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="content-card" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: '#FFA116', fontSize: '2.5rem', marginBottom: '2rem' }}>🏅 User Badges</h2>
        <form onSubmit={search} style={{ display: 'flex', gap: '15px', margin: '2rem 0', justifyContent: 'center' }}>
          <input type="text" className="search-input" placeholder="Enter Leetcode ID..." value={handle} onChange={e => setHandle(e.target.value)} style={{ width: '300px', fontSize: '1.2rem', padding: '1rem' }} />
          <button type="submit" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>{loading ? '...' : 'Search'}</button>
        </form>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '3rem' }}>
          {badges.length === 0 && !loading && handle && <p style={{ color: '#aaa', fontSize: '1.5rem' }}>No badges found or search not initiated.</p>}
          {badges.map(b => (
            <div key={b.name} style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={b.icon.startsWith('http') ? b.icon : 'https://leetcode.com' + b.icon} alt={b.name} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
              <p style={{ fontSize: '1.2rem', marginTop: '1.5rem', fontWeight: 'bold' }}>{b.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}