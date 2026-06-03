import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

export default function CodeforcesRandom() {
  const [problemUrl, setProblemUrl] = useState(null);
  const [problemName, setProblemName] = useState(null);
  const [status, setStatus] = useState("Fetching problem database...");

  useEffect(() => {
    const getRandomProblem = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/random-problem`);
        const p = res.data;
        
        if (p && p.contestId && p.index) {
          setStatus("Rolling the dice... 🎲");
          setProblemUrl(`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`);
          setProblemName(`${p.index} - ${p.name}`);
          setStatus("");
        } else {
          setStatus("Failed to fetch problems from Codeforces.");
        }
      } catch (err) {
        setStatus("Error connecting to Backend API.");
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
