import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function LatestProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/latest-problems`);
        setProblems(response.data);
      } catch (err) {
        setError('Failed to fetch the latest problems. Ensure the backend is live.');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Latest Problems</h1>
      </header>

      {loading && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading latest problems from Codeforces...</p>}
      {error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}

      {!loading && !error && (
        <div className="tracker-dashboard">
          <div className="problem-grid">
            {problems.map((prob, index) => (
              <a 
                key={index}
                href={`https://codeforces.com/problemset/problem/${prob.contestId}/${prob.index}`}
                target="_blank" 
                rel="noreferrer"
                className="problem-card unsolved"
              >
                <div className="prob-header">
                  <span className="prob-id">{prob.contestId}{prob.index}</span>
                  <span className="prob-topic" style={{ color: 'var(--accent)' }}>
                    Rating: {prob.rating || 'N/A'}
                  </span>
                </div>
                <h3 className="prob-name">{prob.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.8rem' }}>
                  {prob.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="prob-topic">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
            {problems.length === 0 && <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No recent problems found.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
