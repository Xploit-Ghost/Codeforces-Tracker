import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Practice() {
  const [handle, setHandle] = useState('');
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [cp31Problems, setCp31Problems] = useState([]);
  const [activeRating, setActiveRating] = useState(800);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSheet = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/latest-problems`); 
        setCp31Problems(res.data);
      } catch (err) {
        console.error("Failed to load problem sheet:", err);
      }
    };
    fetchSheet();
  }, []);

  const checkProgress = async (e) => {
    e.preventDefault();
    if (!handle) return;
    setLoading(true);
    setError('');

    try {
      const res = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
      const solved = new Set(
        res.data.result
          .filter(sub => sub.verdict === 'OK')
          .map(sub => `${sub.problem.contestId}${sub.problem.index}`)
      );
      setSolvedProblems(solved);
    } catch (err) {
      setError("Could not fetch user progress from Codeforces.");
    } finally {
      setLoading(false);
    }
  };

  const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900];
  const filteredProblems = cp31Problems.filter(p => p.rating === activeRating);

  return (
    <div className="container">
      <header>
        <h1>Practice Arena: CP31 Sheet</h1>
      </header>

      <form onSubmit={checkProgress} className="search-form">
        <input 
          type="text" 
          placeholder="Enter Handle to Track Progress" 
          value={handle} 
          onChange={(e) => setHandle(e.target.value)} 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Track Progress'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="tracker-dashboard">
        {/* Rating Selection Tabs */}
        <div className="rating-tabs">
          {ratings.map(r => (
            <button 
              key={r} 
              className={`tab-btn ${activeRating === r ? 'active' : ''}`}
              onClick={() => setActiveRating(r)}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Problem Grid */}
        <div className="problem-grid" style={{ marginTop: '2rem' }}>
          {filteredProblems.map((prob, i) => {
            const isSolved = solvedProblems.has(`${prob.contestId}${prob.index}`);
            return (
              <a 
                key={i}
                href={`https://codeforces.com/problemset/problem/${prob.contestId}/${prob.index}`}
                target="_blank" 
                rel="noreferrer"
                className={`problem-card ${isSolved ? 'solved' : 'unsolved'}`}
              >
                <div className="prob-header">
                  <span className="prob-id">{prob.contestId}{prob.index}</span>
                  {isSolved && <span style={{ color: '#50fa7b', fontWeight: 'bold' }}>✔</span>}
                </div>
                <h3 className="prob-name">{prob.name}</h3>
                <span className="prob-topic">{prob.topic}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
