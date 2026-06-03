import React, { useEffect, useState } from 'react';
import '../App.css';

export default function CodeforcesRandom() {
  const [problemUrl, setProblemUrl] = useState(null);
  const [problemName, setProblemName] = useState(null);
  const [status, setStatus] = useState("Fetching problem database...");

  useEffect(() => {
    const getRandomProblem = async () => {
      try {
        const res = await fetch('https://codeforces.com/api/problemset.problems');
        const data = await res.json();
        
        if (data.status === 'OK') {
          setStatus("Rolling the dice... 🎲");
          const problems = data.result.problems;
          
          // Pick a random problem
          const randomIdx = Math.floor(Math.random() * problems.length);
          const p = problems[randomIdx];
          
          setProblemUrl(`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`);
          setProblemName(`${p.index} - ${p.name}`);
          setStatus("");
        } else {
          setStatus("Failed to fetch problems from Codeforces.");
        }
      } catch (err) {
        setStatus("Error connecting to Codeforces API.");
      }
    };

    getRandomProblem();
  }, []);

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', animation: !problemUrl ? 'spin 2s linear infinite' : 'none' }}>🎲</h1>
        {status ? <h2>{status}</h2> : (
          <>
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Problem Found!</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#4da6ff' }}>{problemName}</p>
            <a href={problemUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                Open in New Tab
              </button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}
