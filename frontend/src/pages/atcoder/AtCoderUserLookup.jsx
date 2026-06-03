
import React, { useState } from 'react';
export default function AtCoderUserLookup() {
  const [handle, setHandle] = useState('');
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    setLoading(true); setSearched(true);
    try {
      // Kenkoooo API: Get submissions
      const res = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${handle}&from_second=0`);
      const data = await res.json();
      setSubs(data || []);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#fff' }}>🔍 Find AtCoder User</h2>
        <form onSubmit={searchUser} style={{ display: 'flex', gap: '10px', margin: '2rem 0' }}>
          <input type="text" className="search-input" placeholder="Enter AtCoder handle..." value={handle} onChange={(e) => setHandle(e.target.value)} style={{ flex: 1 }} />
          <button type="submit" className="primary-button">{loading ? '...' : 'Search'}</button>
        </form>
        
        {searched && !loading && (
          <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px' }}>
            <h2>{handle}</h2>
            <div style={{ marginTop: '2rem' }}>
              <h3>Total Submissions Tracked:</h3>
              <p style={{ fontSize: '2rem', color: '#4CAF50', fontWeight: 'bold' }}>{subs.length.toLocaleString()}</p>
              <a href={`https://atcoder.jp/users/${handle}`} target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: '1rem', color: '#4da6ff' }}>View Full Profile on AtCoder.jp</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}