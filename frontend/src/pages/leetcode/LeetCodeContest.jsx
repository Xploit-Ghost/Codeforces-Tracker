
import React, { useState } from 'react';
export default function LeetCodeContest() {
  const [handle, setHandle] = useState('');
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setContest(null);
    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${handle}/contest`);
      const data = await res.json();
      
      if (data.errors || data.error) {
        setError("Leetcode ID not found.");
      } else if (!data.contestAttend || data.contestAttend === 0) {
        setError("User is not eligible for rating (0 contests attended).");
      } else {
        setContest(data);
      }
    } catch (err) {
      setError("Failed to fetch data.");
    }
    setLoading(false);
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: '#FFA116', fontSize: '2.5rem', marginBottom: '2rem' }}>🏆 Rating and Details</h2>
        <form onSubmit={search} style={{ display: 'flex', gap: '15px', margin: '2rem 0', justifyContent: 'center' }}>
          <input type="text" className="search-input" placeholder="Enter Leetcode ID..." value={handle} onChange={e => setHandle(e.target.value)} style={{ width: '300px', fontSize: '1.2rem', padding: '1rem' }} />
          <button type="submit" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }} disabled={loading}>{loading ? '...' : 'Search'}</button>
        </form>
        
        {error && <p style={{ color: '#ff5252', fontSize: '1.5rem', marginTop: '2rem' }}>{error}</p>}
        
        {contest && contest.contestRating && (
          <div style={{ backgroundColor: '#1a1a1a', padding: '3rem', borderRadius: '12px', marginTop: '2rem' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Rating: <span style={{ color: '#4CAF50' }}>{Math.round(contest.contestRating)}</span></h3>
            <p style={{ color: '#aaa', fontSize: '1.5rem', margin: '1rem 0' }}>Top <strong style={{ color: '#ffb86c' }}>{contest.contestTopPercentage}%</strong></p>
            <p style={{ color: '#aaa', fontSize: '1.5rem' }}>Contests Attended: <strong style={{ color: '#fff' }}>{contest.contestAttend}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}