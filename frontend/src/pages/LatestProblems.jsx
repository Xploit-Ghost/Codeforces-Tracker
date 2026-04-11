import { useState, useEffect } from 'react';
import axios from 'axios';

function LatestProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/latest-problems')
      .then(res => {
        setProblems(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Latest Global Problems</h1>
        <p style={{ color: 'var(--text-muted)' }}>The 100 most recently added Codeforces problems.</p>
      </header>

      {loading ? <p>Loading...</p> : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem', 
          width: '100%' 
        }}>
          {problems.map((prob) => (
            <a 
              key={`${prob.contestId}-${prob.index}`}
              href={`https://codeforces.com/problemset/problem/${prob.contestId}/${prob.index}`}
              target="_blank" rel="noopener noreferrer"
              className="problem-card"
            >
              <div className="prob-header">
                <span className="prob-id">{prob.contestId}-{prob.index}</span>
                {prob.rating && <span style={{ color: 'var(--accent)' }}>★ {prob.rating}</span>}
              </div>
              <h3 className="prob-name">{prob.name}</h3>
              <span className="prob-topic">{prob.tags && prob.tags[0]}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestProblems;