import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

export default function Upsolve() {
  const { cfHandle } = useAuth();
  const [unsolved, setUnsolved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpsolve = async () => {
      if (!cfHandle) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`https://codeforces.com/api/user.status?handle=${cfHandle}`);
        if (res.data.status === 'OK') {
          const subs = res.data.result;
          
          const attemptedMap = new Map();
          const solvedSet = new Set();

          subs.forEach(sub => {
            if (!sub.problem.contestId) return; // Skip gym or weird problems
            
            const probId = `${sub.problem.contestId}-${sub.problem.index}`;
            
            if (!attemptedMap.has(probId)) {
              attemptedMap.set(probId, sub.problem);
            }
            
            if (sub.verdict === 'OK') {
              solvedSet.add(probId);
            }
          });

          const pendingUpsolves = [];
          attemptedMap.forEach((prob, id) => {
            if (!solvedSet.has(id)) {
              pendingUpsolves.push(prob);
            }
          });
          
          // Sort by contest id descending (most recent first)
          pendingUpsolves.sort((a, b) => b.contestId - a.contestId);
          setUnsolved(pendingUpsolves);
        }
      } catch (e) {
        console.error("Failed to fetch upsolve data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUpsolve();
  }, [cfHandle]);

  return (
    <div className="container">
      <div className="card text-page" style={{ maxWidth: '1000px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Pending Upsolves</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          Problems you attempted in a contest or practice, but haven't solved yet.
        </p>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading your submissions...</p>
        ) : !cfHandle ? (
          <p style={{ textAlign: 'center', color: 'var(--error)' }}>Please link your Codeforces handle to use this feature.</p>
        ) : unsolved.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#50fa7b' }}>Wow! You have solved all the problems you ever attempted! Clean slate.</p>
        ) : (
          <div>
            <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '1rem' }}>
              Total Pending: {unsolved.length}
            </p>
            <div className="problem-grid">
              {unsolved.map((p, idx) => (
                <a 
                  key={idx}
                  href={`https://codeforces.com/contest/${p.contestId}/problem/${p.index}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="problem-card unsolved"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div className="prob-header">
                    <span className="prob-id">{p.contestId}{p.index}</span>
                    {p.rating && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Rating: {p.rating}</span>}
                  </div>
                  <h3 className="prob-name">{p.name}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    {p.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="prob-topic">{tag}</span>
                    ))}
                    {p.tags?.length > 3 && <span className="prob-topic">+{p.tags.length - 3}</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
