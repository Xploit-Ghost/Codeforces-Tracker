
import React, { useEffect } from 'react';
export default function LeetCodeRandom() {
  useEffect(() => {
    const problems = ['two-sum', 'longest-substring-without-repeating-characters', 'median-of-two-sorted-arrays', 'longest-palindromic-substring', 'zigzag-conversion', 'reverse-integer', 'string-to-integer-atoi', 'palindrome-number', 'regular-expression-matching', 'container-with-most-water'];
    setTimeout(() => {
      window.location.href = `https://leetcode.com/problems/${problems[Math.floor(Math.random() * problems.length)]}/`;
    }, 1000);
  }, []);
  return (
    <div className="page-container" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1 style={{ fontSize: '4rem', animation: 'spin 2s linear infinite' }}>🎲</h1>
      <h2>Finding a random problem...</h2>
    </div>
  );
}