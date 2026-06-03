const fs = require('fs');
const dir = 'src/pages/atcoder';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const components = {
  'AtCoderWelcome.jsx': `
import React from 'react';
export default function AtCoderWelcome() {
  return (
    <div className="page-container">
      <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#222', backgroundColor: '#fff', display: 'inline-block', padding: '0 1rem', borderRadius: '8px' }}>AtCoder Hub</h1>
        <p className="subtitle" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '2rem auto' }}>
          Your central dashboard for AtCoder. Explore Japanese competitive programming contests, track user submissions via Kenkoooo API, and practice beginner rounds.
        </p>
      </div>
    </div>
  );
}`,
  'AtCoderContests.jsx': `
import React, { useState, useEffect } from 'react';
export default function AtCoderContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://kenkoooo.com/atcoder/resources/contests.json')
      .then(res => res.json())
      .then(data => {
        // Sort by start_epoch_second descending
        const sorted = data.sort((a, b) => b.start_epoch_second - a.start_epoch_second);
        setContests(sorted.slice(0, 50));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#fff' }}>🇯🇵 Recent AtCoder Contests</h2>
        {loading ? <p>Loading contests from Kenkoooo API...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '2rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #444' }}>
                <th style={{ padding: '1rem' }}>ID</th>
                <th style={{ padding: '1rem' }}>Contest Name</th>
                <th style={{ padding: '1rem' }}>Duration (m)</th>
              </tr>
            </thead>
            <tbody>
              {contests.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '1rem' }}>{c.id}</td>
                  <td style={{ padding: '1rem' }}>
                    <a href={\`https://atcoder.jp/contests/\${c.id}\`} target="_blank" rel="noreferrer" style={{ color: '#4da6ff', textDecoration: 'none' }}>{c.title}</a>
                  </td>
                  <td style={{ padding: '1rem', color: '#aaa' }}>{Math.round(c.duration_second / 60)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}`,
  'AtCoderUserLookup.jsx': `
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
      const res = await fetch(\`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=\${handle}&from_second=0\`);
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
              <a href={\`https://atcoder.jp/users/\${handle}\`} target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: '1rem', color: '#4da6ff' }}>View Full Profile on AtCoder.jp</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`
};

Object.entries(components).forEach(([file, content]) => {
  fs.writeFileSync(dir + '/' + file, content);
});
console.log('AtCoder components generated.');
