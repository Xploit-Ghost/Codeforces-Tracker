import { useState, useEffect } from 'react';
import axios from 'axios';

function Practice() {
  const [rating, setRating] = useState(1200);
  const [problem, setProblem] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('practice_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('practice_history', JSON.stringify(history));
  }, [history]);

  const fetchProblem = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/random-problem?rating=${rating}`);
      
      if (problem) {
        setHistory(prev => [{ ...problem, status: problem.status || 'Generated' }, ...prev]);
      }
      
      setProblem({ ...res.data, status: 'Generated' });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const markCurrentAsSolved = () => {
    if (problem) {
      setProblem({ ...problem, status: 'Solved' });
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setProblem(null);
  };

  return (
    <div className="container">
      <header><h1>Practice Arena</h1></header>
      
      <div className="search-form">
        <input 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          step="100" min="800" max="3500"
        />
        <button onClick={fetchProblem} disabled={loading}>
          {loading ? 'Rolling...' : 'Get Random Problem'}
        </button>
      </div>

      {problem && (
        <div className="card" style={{ textAlign: 'center', marginBottom: '2rem', border: problem.status === 'Solved' ? '2px solid #50fa7b' : 'none' }}>
          <h2 style={{ color: 'var(--accent)' }}>{problem.name}</h2>
          <p>Rating: {problem.rating} | Tags: {problem.tags.join(', ')}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <a 
              href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
              target="_blank" rel="noopener noreferrer"
            >
              <button>Solve on Codeforces</button>
            </a>
            <button 
              style={{ backgroundColor: problem.status === 'Solved' ? 'transparent' : '#50fa7b', color: problem.status === 'Solved' ? '#50fa7b' : '#000', border: '1px solid #50fa7b' }}
              onClick={markCurrentAsSolved}
              disabled={problem.status === 'Solved'}
            >
              {problem.status === 'Solved' ? '✓ Marked Solved' : 'Mark as Solved'}
            </button>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--text-muted)', margin: 0 }}>Session History</h3>
            <button onClick={clearHistory} style={{ backgroundColor: 'transparent', color: '#cf6679', border: '1px solid #cf6679', padding: '0.3rem 0.8rem', fontSize: '0.9rem' }}>Clear History</button>
          </div>
          <div className="feed-container">
            {history.map((histProb, idx) => (
              <div key={idx} className="feed-item" style={{ borderLeftColor: histProb.status === 'Solved' ? '#50fa7b' : '#444' }}>
                <div className="feed-info">
                  <a 
                    href={`https://codeforces.com/problemset/problem/${histProb.contestId}/${histProb.index}`}
                    target="_blank" rel="noopener noreferrer"
                    className="feed-prob-name"
                  >
                    {histProb.name}
                  </a>
                  <span className="feed-time">Rating: {histProb.rating}</span>
                </div>
                <span style={{ 
                  color: histProb.status === 'Solved' ? '#50fa7b' : 'var(--text-muted)', 
                  fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' 
                }}>
                  {histProb.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Practice;