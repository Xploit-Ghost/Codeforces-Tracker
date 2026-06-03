
import React from 'react';
const problems = [
  { id: 1, name: 'Two Sum', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/two-sum/' },
  { id: 121, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { id: 217, name: 'Contains Duplicate', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/contains-duplicate/' },
  { id: 238, name: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { id: 53, name: 'Maximum Subarray', difficulty: 'Medium', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/maximum-subarray/' },
  { id: 152, name: 'Maximum Product Subarray', difficulty: 'Medium', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/maximum-product-subarray/' },
  { id: 153, name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
  { id: 33, name: 'Search in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
  { id: 15, name: '3Sum', difficulty: 'Medium', topic: 'Two Pointers', link: 'https://leetcode.com/problems/3sum/' },
  { id: 11, name: 'Container With Most Water', difficulty: 'Medium', topic: 'Two Pointers', link: 'https://leetcode.com/problems/container-with-most-water/' },
  { id: 371, name: 'Sum of Two Integers', difficulty: 'Medium', topic: 'Bit Manipulation', link: 'https://leetcode.com/problems/sum-of-two-integers/' },
  { id: 191, name: 'Number of 1 Bits', difficulty: 'Easy', topic: 'Bit Manipulation', link: 'https://leetcode.com/problems/number-of-1-bits/' },
  { id: 338, name: 'Counting Bits', difficulty: 'Easy', topic: 'Bit Manipulation', link: 'https://leetcode.com/problems/counting-bits/' },
  { id: 268, name: 'Missing Number', difficulty: 'Easy', topic: 'Bit Manipulation', link: 'https://leetcode.com/problems/missing-number/' },
  { id: 190, name: 'Reverse Bits', difficulty: 'Easy', topic: 'Bit Manipulation', link: 'https://leetcode.com/problems/reverse-bits/' },
  { id: 70, name: 'Climbing Stairs', difficulty: 'Easy', topic: '1D DP', link: 'https://leetcode.com/problems/climbing-stairs/' },
  { id: 322, name: 'Coin Change', difficulty: 'Medium', topic: '1D DP', link: 'https://leetcode.com/problems/coin-change/' },
  { id: 300, name: 'Longest Increasing Subsequence', difficulty: 'Medium', topic: '1D DP', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
  { id: 1143, name: 'Longest Common Subsequence', difficulty: 'Medium', topic: '2D DP', link: 'https://leetcode.com/problems/longest-common-subsequence/' },
  { id: 139, name: 'Word Break', difficulty: 'Medium', topic: '1D DP', link: 'https://leetcode.com/problems/word-break/' },
  { id: 39, name: 'Combination Sum', difficulty: 'Medium', topic: 'Backtracking', link: 'https://leetcode.com/problems/combination-sum/' },
  { id: 198, name: 'House Robber', difficulty: 'Medium', topic: '1D DP', link: 'https://leetcode.com/problems/house-robber/' },
  { id: 213, name: 'House Robber II', difficulty: 'Medium', topic: '1D DP', link: 'https://leetcode.com/problems/house-robber-ii/' },
  { id: 91, name: 'Decode Ways', difficulty: 'Medium', topic: '1D DP', link: 'https://leetcode.com/problems/decode-ways/' },
  { id: 62, name: 'Unique Paths', difficulty: 'Medium', topic: '2D DP', link: 'https://leetcode.com/problems/unique-paths/' },
  { id: 55, name: 'Jump Game', difficulty: 'Medium', topic: 'Greedy', link: 'https://leetcode.com/problems/jump-game/' },
  { id: 133, name: 'Clone Graph', difficulty: 'Medium', topic: 'Graphs', link: 'https://leetcode.com/problems/clone-graph/' },
  { id: 207, name: 'Course Schedule', difficulty: 'Medium', topic: 'Graphs', link: 'https://leetcode.com/problems/course-schedule/' },
  { id: 417, name: 'Pacific Atlantic Water Flow', difficulty: 'Medium', topic: 'Graphs', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
  { id: 200, name: 'Number of Islands', difficulty: 'Medium', topic: 'Graphs', link: 'https://leetcode.com/problems/number-of-islands/' },
  { id: 128, name: 'Longest Consecutive Sequence', difficulty: 'Medium', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
  { id: 269, name: 'Alien Dictionary', difficulty: 'Hard', topic: 'Graphs', link: 'https://leetcode.com/problems/alien-dictionary/' },
  { id: 261, name: 'Graph Valid Tree', difficulty: 'Medium', topic: 'Graphs', link: 'https://leetcode.com/problems/graph-valid-tree/' },
  { id: 323, name: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium', topic: 'Graphs', link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
  { id: 57, name: 'Insert Interval', difficulty: 'Medium', topic: 'Intervals', link: 'https://leetcode.com/problems/insert-interval/' },
  { id: 56, name: 'Merge Intervals', difficulty: 'Medium', topic: 'Intervals', link: 'https://leetcode.com/problems/merge-intervals/' },
  { id: 435, name: 'Non-overlapping Intervals', difficulty: 'Medium', topic: 'Intervals', link: 'https://leetcode.com/problems/non-overlapping-intervals/' },
  { id: 252, name: 'Meeting Rooms', difficulty: 'Easy', topic: 'Intervals', link: 'https://leetcode.com/problems/meeting-rooms/' },
  { id: 253, name: 'Meeting Rooms II', difficulty: 'Medium', topic: 'Intervals', link: 'https://leetcode.com/problems/meeting-rooms-ii/' },
  { id: 206, name: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', link: 'https://leetcode.com/problems/reverse-linked-list/' },
  { id: 141, name: 'Linked List Cycle', difficulty: 'Easy', topic: 'Linked List', link: 'https://leetcode.com/problems/linked-list-cycle/' },
  { id: 21, name: 'Merge Two Sorted Lists', difficulty: 'Easy', topic: 'Linked List', link: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
  { id: 23, name: 'Merge k Sorted Lists', difficulty: 'Hard', topic: 'Linked List', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
  { id: 19, name: 'Remove Nth Node From End of List', difficulty: 'Medium', topic: 'Linked List', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
  { id: 143, name: 'Reorder List', difficulty: 'Medium', topic: 'Linked List', link: 'https://leetcode.com/problems/reorder-list/' },
  { id: 73, name: 'Set Matrix Zeroes', difficulty: 'Medium', topic: 'Math & Geometry', link: 'https://leetcode.com/problems/set-matrix-zeroes/' },
  { id: 54, name: 'Spiral Matrix', difficulty: 'Medium', topic: 'Math & Geometry', link: 'https://leetcode.com/problems/spiral-matrix/' },
  { id: 48, name: 'Rotate Image', difficulty: 'Medium', topic: 'Math & Geometry', link: 'https://leetcode.com/problems/rotate-image/' },
  { id: 79, name: 'Word Search', difficulty: 'Medium', topic: 'Backtracking', link: 'https://leetcode.com/problems/word-search/' },
  { id: 3, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Sliding Window', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { id: 424, name: 'Longest Repeating Character Replacement', difficulty: 'Medium', topic: 'Sliding Window', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
  { id: 76, name: 'Minimum Window Substring', difficulty: 'Hard', topic: 'Sliding Window', link: 'https://leetcode.com/problems/minimum-window-substring/' },
  { id: 242, name: 'Valid Anagram', difficulty: 'Easy', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/valid-anagram/' },
  { id: 49, name: 'Group Anagrams', difficulty: 'Medium', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/group-anagrams/' },
  { id: 20, name: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack', link: 'https://leetcode.com/problems/valid-parentheses/' },
  { id: 125, name: 'Valid Palindrome', difficulty: 'Easy', topic: 'Two Pointers', link: 'https://leetcode.com/problems/valid-palindrome/' },
  { id: 5, name: 'Longest Palindromic Substring', difficulty: 'Medium', topic: '1D DP', link: 'https://leetcode.com/problems/longest-palindromic-substring/' },
  { id: 647, name: 'Palindromic Substrings', difficulty: 'Medium', topic: '1D DP', link: 'https://leetcode.com/problems/palindromic-substrings/' },
  { id: 271, name: 'Encode and Decode Strings', difficulty: 'Medium', topic: 'Arrays & Hashing', link: 'https://leetcode.com/problems/encode-and-decode-strings/' },
  { id: 104, name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', topic: 'Trees', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
  { id: 100, name: 'Same Tree', difficulty: 'Easy', topic: 'Trees', link: 'https://leetcode.com/problems/same-tree/' },
  { id: 226, name: 'Invert Binary Tree', difficulty: 'Easy', topic: 'Trees', link: 'https://leetcode.com/problems/invert-binary-tree/' },
  { id: 124, name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', topic: 'Trees', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
  { id: 102, name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', topic: 'Trees', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
  { id: 297, name: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', topic: 'Trees', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
  { id: 572, name: 'Subtree of Another Tree', difficulty: 'Easy', topic: 'Trees', link: 'https://leetcode.com/problems/subtree-of-another-tree/' },
  { id: 105, name: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', topic: 'Trees', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
  { id: 98, name: 'Validate Binary Search Tree', difficulty: 'Medium', topic: 'Trees', link: 'https://leetcode.com/problems/validate-binary-search-tree/' },
  { id: 230, name: 'Kth Smallest Element in a BST', difficulty: 'Medium', topic: 'Trees', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
  { id: 235, name: 'Lowest Common Ancestor of a BST', difficulty: 'Medium', topic: 'Trees', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-bst/' },
  { id: 208, name: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', topic: 'Tries', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
  { id: 211, name: 'Design Add and Search Words Data Structure', difficulty: 'Medium', topic: 'Tries', link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
  { id: 212, name: 'Word Search II', difficulty: 'Hard', topic: 'Tries', link: 'https://leetcode.com/problems/word-search-ii/' },
  { id: 295, name: 'Find Median from Data Stream', difficulty: 'Hard', topic: 'Heap / Priority Queue', link: 'https://leetcode.com/problems/find-median-from-data-stream/' }
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