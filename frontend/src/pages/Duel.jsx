import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Duel() {
  const [handleA, setHandleA] = useState('');
  const [handleB, setHandleB] = useState('');
  const [rating, setRating] = useState(1400);
  const [problem, setProblem] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [winner, setWinner] = useState(null);
  
  const timerRef = useRef(null);
  const arbiterRef = useRef(null);

  const startDuel = async (e) => {
    e.preventDefault();
    if (!handleA || !handleB || !rating) return;
    
    setLoading(true);
    setError('');
    setProblem(null);
    setIsActive(false);
    setWinner(null);
    setTimeElapsed(0);
    clearInterval(timerRef.current);
    clearInterval(arbiterRef.current);

    try {
      const res = await axios.get(`${BACKEND_URL}/api/duel-problem?handles=${handleA};${handleB}&rating=${rating}`);
      setProblem(res.data);
      setIsActive(true);
      window.open(`https://codeforces.com/problemset/problem/${res.data.contestId}/${res.data.index}`, '_blank');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initialize Duel.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isActive && !winner) {
      timerRef.current = setInterval(() => setTimeElapsed(p => p + 1), 1000);
      
      arbiterRef.current = setInterval(async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/duel-check?handles=${handleA};${handleB}&contestId=${problem.contestId}&index=${problem.index}`);
          if (res.data.winner) {
            setWinner(res.data.winner);
            setIsActive(false);
            clearInterval(timerRef.current);
            clearInterval(arbiterRef.current);
          }
        } catch (e) {
          console.error('Arbiter hiccup:', e);
        }
      }, 10000);
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(arbiterRef.current);
    };
  }, [isActive, winner, problem, handleA, handleB]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="container">
      <header><h1>1-on-1 Speed Duel</h1></header>
      
      <form onSubmit={startDuel} className="search-form" style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) minmax(120px, 1fr) minmax(100px, 1fr) auto', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Player 1" 
          value={handleA} 
          onChange={(e) => setHandleA(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Player 2" 
          value={handleB} 
          onChange={(e) => setHandleB(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          step="100" min="800" max="3500" 
          placeholder="Rating" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          required 
        />
        <button type="submit" disabled={loading} style={{ background: '#ff7777', color: '#000', fontWeight: 'bold' }}>
          {loading ? 'Scanning...' : 'START DUEL!'}
        </button>
      </form>

      {error && <div className="error" style={{ color: '#cf6679', textAlign: 'center', marginTop: '20px' }}>{error}</div>}

      {problem && (
        <div className="dashboard" style={{ marginTop: '30px' }}>
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', position: 'relative', border: winner ? '2px solid #50fa7b' : '1px solid #cf6679', transition: 'border 0.3s' }}>
            <h2 style={{ fontSize: '24px', color: '#00d2fe' }}>{problem.name}</h2>
            <p style={{ color: '#a1aebf' }}>Rating: {problem.rating} | Tags: {problem.tags.join(', ')}</p>
            
            {winner ? (
              <div style={{ margin: '30px 0', padding: '20px', background: 'rgba(80, 250, 123, 0.1)', borderRadius: '10px' }}>
                <h1 style={{ color: '#50fa7b', fontSize: '42px', margin: 0, textTransform: 'uppercase' }}>🎉 {winner} WINS! 🎉</h1>
                <p style={{ color: '#e0e0e0', marginTop: '10px', fontSize: '18px' }}>Duel conquered in {formatTime(timeElapsed)}</p>
              </div>
            ) : (
              <div style={{ margin: '30px 0' }}>
                <div style={{ fontSize: '64px', fontFamily: 'monospace', fontWeight: 'bold', color: '#ff7777', textShadow: '0 0 10px rgba(255,119,119,0.5)' }}>
                  {formatTime(timeElapsed)}
                </div>
                <p style={{ color: '#f1fa8c', marginTop: '10px', fontStyle: 'italic' }}>Arbiter is actively monitoring Codeforces submissions...</p>
              </div>
            )}

            <button 
              onClick={() => window.open(`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`, '_blank')} 
              style={{ background: 'transparent', border: '1px solid #bb86fc', color: '#bb86fc', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' }}
            >
              Re-open Problem Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
