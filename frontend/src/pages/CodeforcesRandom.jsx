import React, { useEffect, useState } from 'react';
import '../App.css';

export default function CodeforcesRandom() {
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
          
          setStatus(`Found! Redirecting to ${p.name}...`);
          
          // Give user 1 second to see the text, then redirect
          setTimeout(() => {
            window.location.href = `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`;
          }, 800);
          
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
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div className="content-card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'spin 2s linear infinite' }}>🎲</h1>
        <h2>{status}</h2>
      </div>
    </div>
  );
}
