const fs = require('fs');
const dir = 'src/pages/leetcode';

const components = {
  'LeetCodeWelcome.jsx': `
import React from 'react';
export default function LeetCodeWelcome() {
  return (
    <div className="page-container">
      <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#FFA116' }}>LeetCode Hub</h1>
        <p className="subtitle" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Your central dashboard for LeetCode. Track your Grind 75 progress, analyze your contest ratings, and fetch the daily problem.
        </p>
      </div>
    </div>
  );
}`,
  'LeetCodeBlind75.jsx': `
import React from 'react';
const problems = [
  { id: 1, name: 'Two Sum', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/two-sum/' },
  { id: 121, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { id: 217, name: 'Contains Duplicate', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/contains-duplicate/' },
  { id: 238, name: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { id: 153, name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
  { id: 206, name: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', link: 'https://leetcode.com/problems/reverse-linked-list/' },
  { id: 141, name: 'Linked List Cycle', difficulty: 'Easy', topic: 'Linked List', link: 'https://leetcode.com/problems/linked-list-cycle/' },
  { id: 3, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Sliding Window', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' }
];
export default function LeetCodeBlind75() {
  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#FFA116' }}>🧠 Blind 75 Essentials</h2>
        <p className="subtitle">Curated list of the most important LeetCode problems.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '2rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #444' }}>
              <th style={{ padding: '1rem' }}>Problem</th>
              <th style={{ padding: '1rem' }}>Difficulty</th>
              <th style={{ padding: '1rem' }}>Topic</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '1rem' }}>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>{p.id}. {p.name}</a>
                </td>
                <td style={{ padding: '1rem', color: p.difficulty === 'Easy' ? '#00b8a3' : p.difficulty === 'Medium' ? '#ffc01e' : '#ff375f' }}>{p.difficulty}</td>
                <td style={{ padding: '1rem', color: '#aaa' }}>{p.topic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
  'LeetCodeUserLookup.jsx': `
import React, { useState } from 'react';
export default function LeetCodeUserLookup() {
  const [handle, setHandle] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUser = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await fetch(\`https://alfa-leetcode-api.onrender.com/\${handle}\`);
      const data = await res.json();
      if (data.errors) setError("User not found");
      else setUser(data);
    } catch (err) {
      setError("Failed to fetch from ALFA API");
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#FFA116' }}>🔍 Find LeetCoder</h2>
        <form onSubmit={searchUser} style={{ display: 'flex', gap: '10px', margin: '2rem 0' }}>
          <input type="text" className="search-input" placeholder="Enter LeetCode username..." value={handle} onChange={(e) => setHandle(e.target.value)} style={{ flex: 1 }} />
          <button type="submit" className="primary-button" style={{ backgroundColor: '#FFA116' }} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {user && (
          <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px' }}>
            <img src={user.avatar} alt="avatar" style={{ width: '100px', borderRadius: '12px' }} />
            <h2 style={{ marginTop: '1rem' }}>{user.name || user.username}</h2>
            <p>Rank: <strong>{user.ranking.toLocaleString()}</strong> | Reputation: <strong>{user.reputation}</strong></p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ color: '#00b8a3' }}><h3>Easy</h3><p>{user.easySolved}</p></div>
              <div style={{ color: '#ffc01e' }}><h3>Medium</h3><p>{user.mediumSolved}</p></div>
              <div style={{ color: '#ff375f' }}><h3>Hard</h3><p>{user.hardSolved}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  'LeetCodeDaily.jsx': `
import React, { useState, useEffect } from 'react';
export default function LeetCodeDaily() {
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://alfa-leetcode-api.onrender.com/daily')
      .then(res => res.json())
      .then(data => setDaily(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#FFA116' }}>📅 Daily Challenge</h2>
        {loading ? <p>Loading...</p> : daily ? (
          <div style={{ marginTop: '2rem' }}>
            <h3>{daily.questionTitle}</h3>
            <p style={{ margin: '1rem 0', color: daily.difficulty === 'Easy' ? '#00b8a3' : daily.difficulty === 'Medium' ? '#ffc01e' : '#ff375f' }}>{daily.difficulty}</p>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Date: {daily.date}</p>
            <a href={\`https://leetcode.com\${daily.questionLink}\`} target="_blank" rel="noreferrer" className="primary-button" style={{ backgroundColor: '#FFA116', textDecoration: 'none' }}>Solve Now</a>
          </div>
        ) : <p>Failed to fetch daily challenge.</p>}
      </div>
    </div>
  );
}`,
  'LeetCodeContest.jsx': `
import React, { useState } from 'react';
export default function LeetCodeContest() {
  const [handle, setHandle] = useState('');
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(\`https://alfa-leetcode-api.onrender.com/\${handle}/contest\`);
      setContest(await res.json());
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#FFA116' }}>🏆 Contest History</h2>
        <form onSubmit={search} style={{ display: 'flex', gap: '10px', margin: '2rem 0' }}>
          <input type="text" className="search-input" placeholder="Username..." value={handle} onChange={e => setHandle(e.target.value)} style={{ flex: 1 }} />
          <button type="submit" className="primary-button" style={{ backgroundColor: '#FFA116' }}>{loading ? '...' : 'Search'}</button>
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
}`,
  'LeetCodeBadges.jsx': `
import React, { useState } from 'react';
export default function LeetCodeBadges() {
  const [handle, setHandle] = useState('');
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(\`https://alfa-leetcode-api.onrender.com/\${handle}/badges\`);
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
              <img src={b.icon} alt={b.name} style={{ width: '60px' }} />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{b.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  'LeetCodeRandom.jsx': `
import React, { useEffect } from 'react';
export default function LeetCodeRandom() {
  useEffect(() => {
    const problems = ['two-sum', 'longest-substring-without-repeating-characters', 'median-of-two-sorted-arrays', 'longest-palindromic-substring', 'zigzag-conversion', 'reverse-integer', 'string-to-integer-atoi', 'palindrome-number', 'regular-expression-matching', 'container-with-most-water'];
    setTimeout(() => {
      window.location.href = \`https://leetcode.com/problems/\${problems[Math.floor(Math.random() * problems.length)]}/\`;
    }, 1000);
  }, []);
  return (
    <div className="page-container" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1 style={{ fontSize: '4rem', animation: 'spin 2s linear infinite' }}>🎲</h1>
      <h2>Finding a random problem...</h2>
    </div>
  );
}`
};

Object.entries(components).forEach(([file, content]) => {
  fs.writeFileSync(dir + '/' + file, content);
});
console.log('LeetCode components generated.');
