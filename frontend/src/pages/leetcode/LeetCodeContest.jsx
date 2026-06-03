
import React, { useState } from 'react';
export default function LeetCodeContest() {
  const [handle, setHandle] = useState('');
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${handle}/contest`);
      setContest(await res.json());
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#FFA116' }}>🏆 Contest History</h2>
        <form onSubmit={search} style={{ display: 'flex', gap: '10px', margin: '2rem 0' }}>
          <input type="text" className="search-input" placeholder="Enter Leetcode ID..." value={handle} onChange={e => setHandle(e.target.value)} style={{ flex: 1 }} />
          <button type="submit">{loading ? '...' : 'Search'}</button>
        </form>
        {contest && contest.contestRating && (
          <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px' }}>
            <h3>Current Rating: {Math.round(contest.contestRating)}</h3>
            <p style={{ color: '#aaa' }}>Top {contest.contestTopPercentage}%</p>
            <p style={{ color: '#aaa' }}>Contests Attended: {contest.contestAttend}</p>
          </div>
        )}
      </div>
    </div>
  );
}