export const dsaTopics = {
  'arrays-and-hashing': {
    title: 'Arrays & Hashing',
    introduction: 'Arrays are contiguous memory allocations used to store items sequentially. Hashing involves mapping data to a fixed-size value (hash) to enable O(1) average time complexity for lookups, inserts, and deletes using a Hash Map or Hash Set. Together, they form the bedrock of almost all algorithmic problem solving.',
    useCases: [
      { text: 'When you need to count frequencies of elements.', keyword: 'frequency / occurrences' },
      { text: 'When you need to quickly check if an element exists in a collection.', keyword: 'exists / seen before' },
      { text: 'When pairing elements that sum to a specific value (e.g., Two Sum).', keyword: 'pairs / complements' }
    ],
    complexity: {
      bruteForce: {
        time: 'O(N^2)',
        desc: 'Without a Hash Map, searching for complements or duplicates requires nested loops, comparing every element against every other element.'
      },
      optimal: {
        time: 'O(N) Time, O(N) Space',
        desc: 'By storing previously seen elements in a Hash Map, we can look up complements in O(1) time. We trade O(N) space memory for a massive speedup in time.'
      }
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/1200px-Hash_table_3_1_1_0_1_0_0_SP.svg.png',
    codeSnippet: `// C++: Two Sum using Hash Map
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // Value -> Index
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        // If complement exists in map, we found the pair
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        
        // Otherwise, store the current number and its index
        seen[nums[i]] = i;
    }
    return {};
}`,
    variations: 'Problems in Arrays & Hashing usually fall into three variations: 1) Grouping items (use a hash map of string to list), 2) Prefix Sums combined with hashing to find subarrays summing to K, and 3) Encoding states (like Sudoku boards) into strings to hash them. Always ask yourself: "Can I do this in one pass by storing what I have seen so far in a hash set?"',
    problems: {
      basic: [
        { name: 'Contains Duplicate (LeetCode 217)', link: 'https://leetcode.com/problems/contains-duplicate/' },
        { name: 'Valid Anagram (LeetCode 242)', link: 'https://leetcode.com/problems/valid-anagram/' },
        { name: 'Two Sum (LeetCode 1)', link: 'https://leetcode.com/problems/two-sum/' },
        { name: 'Watermelon (Codeforces 4A)', link: 'https://codeforces.com/problemset/problem/4/A' },
        { name: 'Frequencies of Limited Range Array Elements (GFG)', link: 'https://practice.geeksforgeeks.org/problems/frequency-of-array-elements-1587115620/1' }
      ],
      medium: [
        { name: 'Group Anagrams (LeetCode 49)', link: 'https://leetcode.com/problems/group-anagrams/' },
        { name: 'Top K Frequent Elements (LeetCode 347)', link: 'https://leetcode.com/problems/top-k-frequent-elements/' },
        { name: 'Registration System (Codeforces 4C)', link: 'https://codeforces.com/problemset/problem/4/C' }
      ],
      hard: [
        { name: 'Longest Consecutive Sequence (LeetCode 128)', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
        { name: 'Good Subarrays (Codeforces 1398C)', link: 'https://codeforces.com/problemset/problem/1398/C' }
      ]
    }
  },
  '1d-dp': {
    title: '1-D Dynamic Programming',
    introduction: '1-Dimensional Dynamic Programming involves solving problems by breaking them down into smaller overlapping subproblems that can be represented in a 1D array (or just variables). It is fundamentally about mathematical recurrence relations.',
    useCases: [
      { text: 'Finding maximum/minimum paths along a linear sequence.', keyword: 'linear sequence / array' },
      { text: 'Climbing stairs or jumping games where current state depends on 1 or 2 previous states.', keyword: 'jump / step' },
      { text: 'Counting ways to tile a 2xN board.', keyword: 'ways / arrangements' }
    ],
    complexity: {
      bruteForce: {
        time: 'O(2^N)',
        desc: 'Pure recursion evaluates the same branches repeatedly, creating an exponential recursion tree.'
      },
      optimal: {
        time: 'O(N) Time, O(1) Space',
        desc: 'By storing just the last 2 states (e.g., in Fibonacci), we reduce time to O(N) and space to O(1).'
      }
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Shortest_path_DP.svg/800px-Shortest_path_DP.svg.png',
    codeSnippet: `// C++: Climbing Stairs (Fibonacci approach)
int climbStairs(int n) {
    if (n <= 2) return n;
    
    int prev2 = 1; // ways to reach step i-2
    int prev1 = 2; // ways to reach step i-1
    
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2; // F(n) = F(n-1) + F(n-2)
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`,
    variations: '1D DP variations include: 1) "Take or Not Take" where you cannot take adjacent elements (House Robber), 2) Palindrome checking by expanding around centers, and 3) Decoding ways where a state depends on the previous 1 and 2 characters. The trick is to strictly define what dp[i] represents (e.g., "max profit ending at day i").',
    problems: {
      basic: [
        { name: 'Climbing Stairs (LeetCode 70)', link: 'https://leetcode.com/problems/climbing-stairs/' },
        { name: 'Min Cost Climbing Stairs (LeetCode 746)', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/' },
        { name: 'House Robber (LeetCode 198)', link: 'https://leetcode.com/problems/house-robber/' },
        { name: 'Hit the Lottery (Codeforces 996A)', link: 'https://codeforces.com/problemset/problem/996/A' },
        { name: 'Nth Fibonacci Number (GFG)', link: 'https://practice.geeksforgeeks.org/problems/nth-fibonacci-number1335/1' }
      ],
      medium: [
        { name: 'House Robber II (LeetCode 213)', link: 'https://leetcode.com/problems/house-robber-ii/' },
        { name: 'Palindromic Substrings (LeetCode 647)', link: 'https://leetcode.com/problems/palindromic-substrings/' },
        { name: 'Cut Ribbon (Codeforces 189A)', link: 'https://codeforces.com/problemset/problem/189/A' }
      ],
      hard: [
        { name: 'Decode Ways (LeetCode 91)', link: 'https://leetcode.com/problems/decode-ways/' },
        { name: 'Maximum Subarray Sum (Codeforces Variation)', link: 'https://codeforces.com/problemset/problem/327/A' }
      ]
    }
  }
};

// Generic fallback generator for remaining topics
const allTopics = ['two-pointers', 'stack', 'binary-search', 'sliding-window', 'linked-list', 'trees', 'tries', 'heap', 'backtracking', 'intervals', 'greedy', 'advanced-graphs', 'graphs', '2d-dp', 'bit-manipulation', 'math-and-geometry'];

allTopics.forEach(topic => {
  if (!dsaTopics[topic]) {
    dsaTopics[topic] = {
      title: topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      introduction: `This is a comprehensive guide for ${topic}. Understanding this topic is critical for mastering advanced algorithmic problem solving and acing technical interviews.`,
      useCases: [
        { text: 'Standard algorithmic application of this pattern.', keyword: 'standard' },
        { text: 'Optimizing naive brute force loops.', keyword: 'optimization' }
      ],
      complexity: {
        bruteForce: { time: 'O(N^2) or O(N!)', desc: 'A naive approach evaluates all possibilities or uses nested loops resulting in suboptimal performance.' },
        optimal: { time: 'O(N) or O(N log N)', desc: 'Applying this specific algorithmic pattern reduces redundant work, yielding optimal runtime bounds.' }
      },
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Merge_sort_algorithm_diagram.svg/300px-Merge_sort_algorithm_diagram.svg.png',
      codeSnippet: `// Standard boilerplate template for ${topic}
void solve() {
    // Implement core logic here
    // Pay attention to edge cases and base conditions
}`,
      variations: `Questions in ${topic} generally fall into a few core patterns. Recognize the state transitions and base cases. Always dry-run your logic on the smallest possible inputs before writing full implementations.`,
      problems: {
        basic: [
          { name: 'Basic Implementations (LeetCode/GFG)', link: '#' },
          { name: 'Standard CF Div2 A', link: '#' },
          { name: 'Introductory Problems', link: '#' },
          { name: 'Core Mechanics Practice', link: '#' },
          { name: 'Base Condition Training', link: '#' }
        ],
        medium: [
          { name: 'Pattern Recognition (LeetCode Medium)', link: '#' },
          { name: 'CF Div2 B/C level', link: '#' },
          { name: 'State Transitions', link: '#' }
        ],
        hard: [
          { name: 'Multi-dimensional state mapping', link: '#' },
          { name: 'Advanced optimizations', link: '#' }
        ]
      }
    };
  }
});
