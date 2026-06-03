
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
        <h2 style={{ color: '#FFA116', fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>🧠 Blind 75 Essentials</h2>
        <p className="subtitle" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem', color: '#ccc' }}>Curated list of the most important LeetCode problems.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {problems.map(p => (
            <div key={p.id} className="problem-card" style={{ backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold', flex: 1, marginRight: '1rem' }}>
                    {p.id}. {p.name}
                  </a>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '20px', 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold',
                    backgroundColor: p.difficulty === 'Easy' ? 'rgba(0, 184, 163, 0.1)' : p.difficulty === 'Medium' ? 'rgba(255, 192, 30, 0.1)' : 'rgba(255, 55, 95, 0.1)',
                    color: p.difficulty === 'Easy' ? '#00b8a3' : p.difficulty === 'Medium' ? '#ffc01e' : '#ff375f' 
                  }}>
                    {p.difficulty}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 'auto', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                <span style={{ color: '#aaa', fontSize: '0.95rem' }}>🏷️ {p.topic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}