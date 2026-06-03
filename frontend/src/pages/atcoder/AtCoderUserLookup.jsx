
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
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem' }}>🔍 Find AtCoder User</h2>
        <form onSubmit={searchUser} style={{ display: 'flex', gap: '15px', margin: '2rem 0', justifyContent: 'center' }}>
          <input type="text" className="search-input" placeholder="Enter AtCoder handle..." value={handle} onChange={(e) => setHandle(e.target.value)} style={{ width: '300px', fontSize: '1.2rem', padding: '1rem' }} />
          <button type="submit" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>{loading ? '...' : 'Search'}</button>
        </form>
        
        {searched && !loading && (
          <div style={{ backgroundColor: '#1a1a1a', padding: '3rem', borderRadius: '12px', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>{handle}</h2>
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#ccc' }}>Total Submissions Tracked:</h3>
              <p style={{ fontSize: '4rem', color: '#4CAF50', fontWeight: 'bold', margin: '1rem 0' }}>{subs.length.toLocaleString()}</p>
              <a href={`https://atcoder.jp/users/${handle}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1.5rem', fontSize: '1.2rem', textDecoration: 'none' }}>
                <button style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>View Full Profile on AtCoder.jp</button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}