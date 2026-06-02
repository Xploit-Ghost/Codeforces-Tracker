import React, { useState, useEffect } from 'react';
import '../App.css';

export default function CodeforcesPopular() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch('https://codeforces.com/api/problemset.problems');
        const data = await res.json();
        
        if (data.status === 'OK') {
          // data.result.problemStatistics contains solvedCount
          // We need to merge problem info with its statistics
          const problemList = data.result.problems;
          const statsList = data.result.problemStatistics;
          
          // Map for O(1) lookup of stats by problem identifier (contestId + index)
          const statsMap = new Map();
          statsList.forEach(stat => {
            statsMap.set(`${stat.contestId}-${stat.index}`, stat.solvedCount);
          });

          // Combine and sort
          const combined = problemList.map(p => ({
            ...p,
            solvedCount: statsMap.get(`${p.contestId}-${p.index}`) || 0
          }));
          
          // Sort by solved count descending and take top 100
          combined.sort((a, b) => b.solvedCount - a.solvedCount);
          setProblems(combined.slice(0, 100));
        } else {
          setError(data.comment);
        }
      } catch (err) {
        setError("Failed to fetch popular problems.");
      }
      setLoading(false);
    };
    
    fetchPopular();
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2>🔥 Hall of Fame</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>The Top 100 most solved Codeforces problems of all time.</p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Fetching the Codeforces Archive...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #444', backgroundColor: '#1a1a1a' }}>
                  <th style={{ padding: '1rem' }}>Rank</th>
                  <th style={{ padding: '1rem' }}>Problem</th>
                  <th style={{ padding: '1rem' }}>Rating</th>
                  <th style={{ padding: '1rem' }}>Total Solves</th>
                  <th style={{ padding: '1rem' }}>Tags</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((p, index) => (
                  <tr key={p.contestId + p.index} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: index < 3 ? '#FFD700' : '#fff' }}>#{index + 1}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                      <a href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`} target="_blank" rel="noreferrer" style={{ color: '#4da6ff', textDecoration: 'none' }}>
                        {p.index} - {p.name}
                      </a>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: p.rating ? '#ffb86c' : '#aaa' }}>{p.rating || 'N/A'}</span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#4CAF50' }}>
                      {p.solvedCount.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#888' }}>
                      {p.tags.slice(0, 3).join(', ')} {p.tags.length > 3 && '...'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
