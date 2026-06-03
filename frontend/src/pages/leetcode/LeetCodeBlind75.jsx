
import React from 'react';
const problems = [
  { id: 1, name: 'Two Sum', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/two-sum/' },
  { id: 121, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { id: 217, name: 'Contains Duplicate', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/contains-duplicate/' },
  { id: 238, name: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { id: 153, name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
  { id: 206, name: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', link: 'https://leetcode.com/problems/reverse-linked-list/' },
  { id: 141, name: 'Linked List Cycle', difficulty: 'Easy', topic: 'Linked List', link: 'https://leetcode.com/problems/linked-list-cycle/' },
  { id: 3, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Sliding Window', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' }
];
export default function LeetCodeBlind75() {
  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#FFA116' }}>🧠 Blind 75 Essentials</h2>
        <p className="subtitle">Curated list of the most important LeetCode problems.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '2rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #444' }}>
              <th style={{ padding: '1rem' }}>Problem</th>
              <th style={{ padding: '1rem' }}>Difficulty</th>
              <th style={{ padding: '1rem' }}>Topic</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '1rem' }}>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>{p.id}. {p.name}</a>
                </td>
                <td style={{ padding: '1rem', color: p.difficulty === 'Easy' ? '#00b8a3' : p.difficulty === 'Medium' ? '#ffc01e' : '#ff375f' }}>{p.difficulty}</td>
                <td style={{ padding: '1rem', color: '#aaa' }}>{p.topic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}