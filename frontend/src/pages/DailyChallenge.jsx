import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

export default function DailyChallenge() {
  const { cfHandle } = useAuth();
  const [problems, setProblems] = useState([]);
  const [solvedSet, setSolvedSet] = useState(new Set());
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
          
          const daily = [
            { ...pickProblem(easyProbs, 1), difficulty: 'Easy (800-1100)' },
            { ...pickProblem(medProbs, 2), difficulty: 'Medium (1200-1500)' },
            { ...pickProblem(hardProbs, 3), difficulty: 'Hard (1600-2000)' }
          ];
          setProblems(daily);

          if (cfHandle) {
            const statusRes = await axios.get(`https://codeforces.com/api/user.status?handle=${cfHandle}`);
            if (statusRes.data.status === 'OK') {
              const solved = new Set(
                statusRes.data.result
                  .filter(s => s.verdict === 'OK')
                  .map(s => `${s.problem.contestId}-${s.problem.index}`)
              );
              setSolvedSet(solved);
            }
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDaily();
  }, [cfHandle]);

  const getReminderLink = (p) => {
    const dStart = new Date();
    dStart.setHours(18, 0, 0, 0); // Remind at 6 PM
    const dEnd = new Date(dStart.getTime() + 60 * 60 * 1000);
    const format = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const dates = `${format(dStart)}/${format(dEnd)}`;
    const text = encodeURIComponent(`Solve Daily Challenge: ${p.name}`);
    const details = encodeURIComponent(`Codeforces problem: https://codeforces.com/contest/${p.contestId}/problem/${p.index}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
  };

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
                <div key={idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'absolute', top: '-10px', left: '10px', background: 'var(--accent)', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 1 }}>
                    {p.difficulty}
                  </div>
                  <a 
                    href={`https://codeforces.com/contest/${p.contestId}/problem/${p.index}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`problem-card ${solvedSet.has(`${p.contestId}-${p.index}`) ? 'solved-card' : 'unsolved'}`}
                    style={{ marginTop: '10px', display: 'block', flex: 1, border: solvedSet.has(`${p.contestId}-${p.index}`) ? '2px solid #50fa7b' : '' }}
                  >
                    <div className="prob-header">
                      <span className="prob-id">{p.contestId}{p.index}</span>
                      {solvedSet.has(`${p.contestId}-${p.index}`) && (
                        <span style={{ color: '#50fa7b', fontWeight: 'bold', fontSize: '0.9rem' }}>ACCEPTED</span>
                      )}
                    </div>
                    <h3 className="prob-name">{p.name}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                      {p.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="prob-topic">{tag}</span>
                      ))}
                      {p.tags?.length > 3 && <span className="prob-topic">+{p.tags.length - 3}</span>}
                    </div>
                  </a>
                  {!solvedSet.has(`${p.contestId}-${p.index}`) && (
                    <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                      <a 
                        href={getReminderLink(p)}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '20px', textDecoration: 'none', fontSize: '0.8rem', border: '1px solid #444', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#000'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                      >
                        🔔 Add to Google Calendar
                      </a>
                    </div>
                  )}
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
