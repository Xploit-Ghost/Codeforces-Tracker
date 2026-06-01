import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

const topicData = {
  'dynamic-programming': {
    title: 'Dynamic Programming',
    introduction: 'Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. It is applicable when the subproblems overlap—meaning the same subproblems are solved multiple times. By storing the results of these subproblems (memoization) or building up solutions from smaller ones (tabulation), DP drastically reduces the computational time from exponential to polynomial.',
    useCases: [
      { text: 'Finding the maximum or minimum (e.g., shortest path, minimum coins).', keyword: 'max/min' },
      { text: 'Counting the number of ways to do something (e.g., number of paths).', keyword: 'number of ways' },
      { text: 'Problems involving "choose or not choose" (e.g., Knapsack).', keyword: 'choose/not choose' }
    ],
    complexity: {
      bruteForce: {
        time: 'O(2^N) or O(N!)',
        desc: 'Without DP, overlapping subproblems are re-evaluated repeatedly. This leads to an exponential explosion of function calls. If N > 20, a brute force approach will almost certainly yield a Time Limit Exceeded (TLE).'
      },
      optimal: {
        time: 'O(N) or O(N^2)',
        desc: 'DP caches the result of each subproblem. Thus, each subproblem is evaluated exactly once. The time complexity becomes roughly the Number of States × Transition Time. This allows solving for N = 10^5 in under 1 second.'
      }
    },
    image: '/dp_visual.png',
    problems: {
      basic: [
        { name: 'Fibonacci Number (LeetCode 509)', link: 'https://leetcode.com/problems/fibonacci-number/' },
        { name: 'Climbing Stairs (LeetCode 70)', link: 'https://leetcode.com/problems/climbing-stairs/' },
        { name: 'Min Cost Climbing Stairs (LeetCode 746)', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/' },
        { name: 'Hit the Lottery (Codeforces 996A)', link: 'https://codeforces.com/problemset/problem/996/A' },
        { name: 'Nth Catalan Number (GFG)', link: 'https://practice.geeksforgeeks.org/problems/nth-catalan-number/0' }
      ],
      medium: [
        { name: 'Coin Change (LeetCode 322)', link: 'https://leetcode.com/problems/coin-change/' },
        { name: 'Longest Increasing Subsequence (LeetCode 300)', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
        { name: 'Cut Ribbon (Codeforces 189A)', link: 'https://codeforces.com/problemset/problem/189/A' }
      ],
      hard: [
        { name: 'Regular Expression Matching (LeetCode 10)', link: 'https://leetcode.com/problems/regular-expression-matching/' },
        { name: 'Flowers (Codeforces 474D)', link: 'https://codeforces.com/problemset/problem/474/D' }
      ]
    }
  }
};

export default function DsaTopic() {
  const { topicId } = useParams();
  const data = topicData[topicId];

  if (!data) {
    return (
      <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Topic "{topicId}" content is currently being written!</h2>
        <Link to="/dsa" style={{ color: 'var(--accent)', marginTop: '1rem' }}>Return to DSA Graph</Link>
      </div>
    );
  }

  return (
    <div className="container text-page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/dsa" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to DSA Graph
      </Link>
      
      <h1 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        {data.title}
      </h1>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>1. Introduction</h2>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
          {data.introduction}
        </p>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>2. Use Cases & Identification</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.useCases.map((uc, i) => (
            <div key={i} style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
              <strong style={{ color: 'var(--accent)', fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem' }}>Keyword: {uc.keyword}</strong>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{uc.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem' }}>3. Complexity Analysis: Brute Force vs Optimal</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '300px', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h3 style={{ color: '#ef4444', marginTop: 0, fontSize: '1.5rem' }}>Brute Force</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem', fontFamily: 'JetBrains Mono' }}>
              {data.complexity.bruteForce.time}
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              {data.complexity.bruteForce.desc}
            </p>
          </div>

          <div style={{ flex: 1, minWidth: '300px', backgroundColor: 'rgba(43, 179, 167, 0.05)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(43, 179, 167, 0.2)' }}>
            <h3 style={{ color: 'var(--accent)', marginTop: 0, fontSize: '1.5rem' }}>Optimal Approach</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem', fontFamily: 'JetBrains Mono' }}>
              {data.complexity.optimal.time}
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              {data.complexity.optimal.desc}
            </p>
          </div>

        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>4. Visual Approach</h2>
        <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
          <img src={data.image} alt={`${data.title} Visualized`} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>5. Practice Problems</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Start from the basic direct implementations and work your way up. We have curated 10 essential questions for this topic.
        </p>
        
        <h3 style={{ color: '#4ade80' }}>Basic (Direct Implementation) - 5 Questions</h3>
        <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
          {data.problems.basic.map((p, i) => (
            <li key={i} style={{ padding: '0.8rem', backgroundColor: '#111', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.1rem' }}>
                {i + 1}. {p.name}
              </a>
            </li>
          ))}
        </ul>

        <h3 style={{ color: '#facc15' }}>Medium (Variations & State Finding) - 3 Questions</h3>
        <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
          {data.problems.medium.map((p, i) => (
            <li key={i} style={{ padding: '0.8rem', backgroundColor: '#111', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.1rem' }}>
                {i + 1}. {p.name}
              </a>
            </li>
          ))}
        </ul>

        <h3 style={{ color: '#f87171' }}>Hard (Multi-Dimensional & Optimizations) - 2 Questions</h3>
        <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
          {data.problems.hard.map((p, i) => (
            <li key={i} style={{ padding: '0.8rem', backgroundColor: '#111', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.1rem' }}>
                {i + 1}. {p.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
