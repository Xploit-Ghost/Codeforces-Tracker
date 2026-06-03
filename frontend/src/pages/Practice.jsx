import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

export default function Practice() {
  const [rating, setRating] = useState(800);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('practice_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const getRandomProblem = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/random-problem?rating=${rating}`);
      const newProblem = {
        ...res.data,
        timestamp: new Date().toLocaleString()
      };
      
      const updatedHistory = [newProblem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('practice_history', JSON.stringify(updatedHistory));
      
      window.open(`https://codeforces.com/problemset/problem/${res.data.contestId}/${res.data.index}`, '_blank');
    } catch (err) {
      alert("Error fetching problem. Make sure the backend is live.");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('practice_history');
  };

  return (
    <div className="container">
      <header><h1>Practice Arena</h1></header>

      <div className="search-form">
        <input 
          type="number" 
          step="100" min="800" max="3500"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={getRandomProblem} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Random Problem'}
        </button>
        <button onClick={clearHistory} style={{background: 'var(--error)'}}>Clear History</button>
      </div>

      <div className="dashboard">
        <div className="card">
          <h2>Session History</h2>
          <div className="contest-list">
            {history.map((p, i) => (
              <div key={i} className="contest-row">
                <div className="contest-name-container">
                  <a href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`} target="_blank" rel="noreferrer" className="contest-title">
                    {p.name} ({p.rating})
                  </a>
                  <span className="contest-date">{p.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
