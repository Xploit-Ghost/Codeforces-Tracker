import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

export default function DailyChallenge() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const res = await axios.get('https://codeforces.com/api/problemset.problems');
        if (res.data.status === 'OK') {
          const allProbs = res.data.result.problems;
          // Seed random based on date
          const today = new Date();
          const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
          
          const random = (s) => {
            let x = Math.sin(s) * 10000;
            return x - Math.floor(x);
          };

          const easyProbs = allProbs.filter(p => p.rating >= 800 && p.rating <= 1100);
          const medProbs = allProbs.filter(p => p.rating >= 1200 && p.rating <= 1500);
          const hardProbs = allProbs.filter(p => p.rating >= 1600 && p.rating <= 2000);

          const pickProblem = (arr, offset) => arr[Math.floor(random(seed + offset) * arr.length)];
          
          setProblems([
            { ...pickProblem(easyProbs, 1), difficulty: 'Easy (800-1100)' },
            { ...pickProblem(medProbs, 2), difficulty: 'Medium (1200-1500)' },
            { ...pickProblem(hardProbs, 3), difficulty: 'Hard (1600-2000)' }
          ]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDaily();
  }, []);

  return (
    <div className="container">
      <div className="card text-page" style={{ maxWidth: '1000px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Daily Challenge</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          A new set of problems is generated every day to keep your skills sharp!
        </p>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading daily challenges...</p>
        ) : (
          <div className="problem-grid">
            {problems.map((p, idx) => (
              p && p.contestId ? (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', left: '10px', background: 'var(--accent)', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 1 }}>
                    {p.difficulty}
                  </div>
                  <a 
                    href={`https://codeforces.com/contest/${p.contestId}/problem/${p.index}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="problem-card unsolved"
                    style={{ marginTop: '10px', display: 'block' }}
                  >
                    <div className="prob-header">
                      <span className="prob-id">{p.contestId}{p.index}</span>
                    </div>
                    <h3 className="prob-name">{p.name}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                      {p.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="prob-topic">{tag}</span>
                      ))}
                      {p.tags?.length > 3 && <span className="prob-topic">+{p.tags.length - 3}</span>}
                    </div>
                  </a>
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
