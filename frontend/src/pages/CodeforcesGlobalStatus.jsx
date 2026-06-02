import React, { useState, useEffect } from 'react';
import '../App.css';

export default function CodeforcesGlobalStatus() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('https://codeforces.com/api/problemset.recentStatus?count=50');
        const data = await res.json();
        if (data.status === 'OK') {
          setSubmissions(data.result);
        } else {
          setError(data.comment);
        }
      } catch (err) {
        setError("Failed to fetch live status.");
      }
      setLoading(false);
    };
    fetchStatus();
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2>🌐 Live Global Submissions</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>Real-time feed of the last 50 submissions across all of Codeforces.</p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Fetching live submissions...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #444', backgroundColor: '#1a1a1a' }}>
                  <th style={{ padding: '1rem' }}>ID</th>
                  <th style={{ padding: '1rem' }}>When</th>
                  <th style={{ padding: '1rem' }}>Who</th>
                  <th style={{ padding: '1rem' }}>Problem</th>
                  <th style={{ padding: '1rem' }}>Lang</th>
                  <th style={{ padding: '1rem' }}>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => {
                  const date = new Date(sub.creationTimeSeconds * 1000);
                  const isAccepted = sub.verdict === 'OK';
                  return (
                    <tr key={sub.id} style={{ borderBottom: '1px solid #333' }}>
                      <td style={{ padding: '0.8rem' }}>
                        <a href={`https://codeforces.com/contest/${sub.problem.contestId}/submission/${sub.id}`} target="_blank" rel="noreferrer" style={{ color: '#4da6ff' }}>
                          {sub.id}
                        </a>
                      </td>
                      <td style={{ padding: '0.8rem', fontSize: '0.9rem', color: '#aaa' }}>{date.toLocaleTimeString()}</td>
                      <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>
                        <a href={`https://codeforces.com/profile/${sub.author.members[0].handle}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                          {sub.author.members[0].handle}
                        </a>
                      </td>
                      <td style={{ padding: '0.8rem' }}>
                        <a href={`https://codeforces.com/problemset/problem/${sub.problem.contestId}/${sub.problem.index}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                          {sub.problem.index} - {sub.problem.name}
                        </a>
                      </td>
                      <td style={{ padding: '0.8rem', fontSize: '0.9rem' }}>{sub.programmingLanguage}</td>
                      <td style={{ padding: '0.8rem', fontWeight: 'bold', color: isAccepted ? '#4CAF50' : '#FF5252' }}>
                        {isAccepted ? 'Accepted' : sub.verdict || 'TESTING'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
