import React, { useState, useEffect } from 'react';
export default function LeetCodeRandom() {
  const [problemUrl, setProblemUrl] = useState('');

  useEffect(() => {
    const problems = ['two-sum', 'longest-substring-without-repeating-characters', 'median-of-two-sorted-arrays', 'longest-palindromic-substring', 'zigzag-conversion', 'reverse-integer', 'string-to-integer-atoi', 'palindrome-number', 'regular-expression-matching', 'container-with-most-water'];
    const randomUrl = `https://leetcode.com/problems/${problems[Math.floor(Math.random() * problems.length)]}/`;
    setProblemUrl(randomUrl);
  }, []);

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎲</h1>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Your Random Problem is Ready!</h2>
        {problemUrl && (
          <a href={problemUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ fontSize: '1.5rem', padding: '1rem 3rem', backgroundColor: '#FFA116', color: '#000', fontWeight: 'bold' }}>
              Open in New Tab
            </button>
          </a>
        )}
      </div>
    </div>
  );
}