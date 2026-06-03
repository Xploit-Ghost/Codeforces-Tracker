
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
                    <a href={`https://atcoder.jp/contests/${c.id}`} target="_blank" rel="noreferrer" style={{ color: '#4da6ff', textDecoration: 'none' }}>{c.title}</a>
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
}