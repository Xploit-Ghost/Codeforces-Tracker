export const dsaTopics = {
  'arrays-and-hashing': {
    title: 'Arrays & Hashing',
    introduction: 'Arrays are contiguous memory allocations used to store items sequentially. Hashing involves mapping data to a fixed-size value to enable O(1) average time complexity for lookups, inserts, and deletes using a Hash Map or Hash Set.',
    useCases: [
      { text: 'Counting frequencies of elements.', keyword: 'frequency / occurrences' },
      { text: 'Checking if an element exists in a collection.', keyword: 'exists / seen before' },
      { text: 'Pairing elements that sum to a specific value.', keyword: 'pairs / complements' }
    ],
    complexity: {
      bruteForce: { time: 'O(N^2)', desc: 'Searching without a hash map requires nested loops.' },
      optimal: { time: 'O(N) Time, O(N) Space', desc: 'Storing seen elements in a hash map allows O(1) lookups.' }
    },
    image: '/dsa/hash_table.png',
    codeSnippet: `// C++: Two Sum using Hash Map
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) return {seen[complement], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
    variations: 'Group items using hash map, prefix sums combined with hashing, encoding states into strings.',
    problems: {
      basic: [{ name: 'Two Sum', link: 'https://leetcode.com/problems/two-sum/' }],
      medium: [{ name: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/' }],
      hard: [{ name: 'Longest Consecutive Sequence', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' }]
    }
  },
  'two-pointers': {
    title: 'Two Pointers',
    introduction: 'Two Pointers is a technique where you iterate through a data structure with two pointers, usually starting at the beginning and end, or moving at different speeds.',
    useCases: [
      { text: 'Searching pairs in a sorted array.', keyword: 'sorted pairs' },
      { text: 'Reversing an array in-place.', keyword: 'reverse' },
      { text: 'Finding palindromes.', keyword: 'palindrome' }
    ],
    complexity: {
      bruteForce: { time: 'O(N^2)', desc: 'Checking all possible pairs with nested loops.' },
      optimal: { time: 'O(N)', desc: 'Moving pointers inward reduces time complexity to O(N).' }
    },
    image: '/dsa/two_pointers.png',
    codeSnippet: `// C++: Two Sum II - Input Array Is Sorted
vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    while (left < right) {
        int current_sum = numbers[left] + numbers[right];
        if (current_sum == target) {
            return {left + 1, right + 1};
        } else if (current_sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {};
}`,
    variations: 'Opposite directional (left/right), Same directional (fast/slow pointers), Sliding Window.',
    problems: {
      basic: [{ name: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome/' }],
      medium: [{ name: '3Sum', link: 'https://leetcode.com/problems/3sum/' }],
      hard: [{ name: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/' }]
    }
  },
  'stack': {
    title: 'Stack',
    introduction: 'A Stack is a LIFO (Last-In-First-Out) data structure. The last element added to the stack will be the first one removed.',
    useCases: [
      { text: 'Parsing expressions and matching parenthesis.', keyword: 'parsing / matching' },
      { text: 'Finding the Next Greater Element (Monotonic Stack).', keyword: 'next greater' },
      { text: 'Undo operations or traversing backwards.', keyword: 'history / back' }
    ],
    complexity: {
      bruteForce: { time: 'O(N^2)', desc: 'Searching forward repeatedly for the next greater element.' },
      optimal: { time: 'O(N)', desc: 'Using a monotonic stack ensures each element is pushed and popped exactly once.' }
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lifo_stack.png',
    codeSnippet: `// C++: Valid Parentheses
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}`,
    variations: 'Monotonic Stacks (increasing/decreasing), Expression Evaluation (Postfix), Min Stack.',
    problems: {
      basic: [{ name: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses/' }],
      medium: [{ name: 'Daily Temperatures', link: 'https://leetcode.com/problems/daily-temperatures/' }],
      hard: [{ name: 'Largest Rectangle in Histogram', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' }]
    }
  },
  'binary-search': {
    title: 'Binary Search',
    introduction: 'Binary Search is a divide-and-conquer algorithm that searches a sorted array by repeatedly dividing the search interval in half.',
    useCases: [
      { text: 'Searching a target in a sorted array.', keyword: 'sorted search' },
      { text: 'Finding a monotonic boundary (e.g. first bad version).', keyword: 'monotonic boundary' },
      { text: 'Binary search on answer (parametric search).', keyword: 'search space' }
    ],
    complexity: {
      bruteForce: { time: 'O(N)', desc: 'Linear scanning the array.' },
      optimal: { time: 'O(log N)', desc: 'Dividing the search space in half each time.' }
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg',
    codeSnippet: `// C++: Standard Binary Search
int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    variations: 'Standard Search, Finding Upper/Lower Bounds, Binary Search on Answer (e.g. Koko Eating Bananas).',
    problems: {
      basic: [{ name: 'Binary Search', link: 'https://leetcode.com/problems/binary-search/' }],
      medium: [{ name: 'Koko Eating Bananas', link: 'https://leetcode.com/problems/koko-eating-bananas/' }],
      hard: [{ name: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' }]
    }
  },
  'sliding-window': {
    title: 'Sliding Window',
    introduction: 'Sliding window is an extension of two pointers where the two pointers define a "window" of elements. The window expands and contracts to satisfy a condition.',
    useCases: [
      { text: 'Finding longest/shortest subarray with a condition.', keyword: 'subarray / substring' },
      { text: 'Fixed size window calculations (e.g. max sum of size K).', keyword: 'fixed size' }
    ],
    complexity: {
      bruteForce: { time: 'O(N^2)', desc: 'Checking all possible subarrays.' },
      optimal: { time: 'O(N)', desc: 'Right pointer expands the window, left pointer shrinks it. Both traverse at most N times.' }
    },
    image: '/dsa/sliding_window.png',
    codeSnippet: `// C++: Longest Substring Without Repeating Characters
int lengthOfLongestSubstring(string s) {
    unordered_set<char> chars;
    int left = 0, res = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (chars.count(s[right])) {
            chars.erase(s[left]);
            left++;
        }
        chars.insert(s[right]);
        res = max(res, right - left + 1);
    }
    return res;
}`,
    variations: 'Fixed Window, Variable Window (expand right, shrink left).',
    problems: {
      basic: [{ name: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' }],
      medium: [{ name: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' }],
      hard: [{ name: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/' }]
    }
  },
  'trees': {
    title: 'Trees',
    introduction: 'A Tree is a hierarchical data structure consisting of nodes connected by edges. Binary Trees restrict each node to at most two children.',
    useCases: [
      { text: 'Hierarchical data representation.', keyword: 'hierarchy' },
      { text: 'Fast searching/inserting in Binary Search Trees (BST).', keyword: 'BST' },
      { text: 'Prefix matching (Tries).', keyword: 'prefix' }
    ],
    complexity: {
      bruteForce: { time: 'O(N)', desc: 'Traversing a skewed tree (linked list).' },
      optimal: { time: 'O(log N)', desc: 'Operations on a balanced Binary Search Tree.' }
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Binary_tree.svg',
    codeSnippet: `// C++: Invert Binary Tree (DFS)
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
};

TreeNode* invertTree(TreeNode* root) {
    if (root == NULL) return NULL;
    
    // Swap left and right children
    TreeNode* temp = root->left;
    root->left = root->right;
    root->right = temp;
    
    // Recursively invert subtrees
    invertTree(root->left);
    invertTree(root->right);
    
    return root;
}`,
    variations: 'Depth First Search (Pre/In/Post order), Breadth First Search (Level order), Lowest Common Ancestor.',
    problems: {
      basic: [{ name: 'Invert Binary Tree', link: 'https://leetcode.com/problems/invert-binary-tree/' }],
      medium: [{ name: 'Binary Tree Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' }],
      hard: [{ name: 'Serialize and Deserialize Binary Tree', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' }]
    }
  },
  'graphs': {
    title: 'Graphs',
    introduction: 'Graphs represent relationships between objects using Nodes (Vertices) and Edges. They can be directed or undirected, weighted or unweighted.',
    useCases: [
      { text: 'Finding shortest paths (BFS, Dijkstra).', keyword: 'shortest path' },
      { text: 'Finding connected components or cycles (DFS, Union Find).', keyword: 'connectivity' },
      { text: 'Topological sorting for dependencies.', keyword: 'dependencies' }
    ],
    complexity: {
      bruteForce: { time: 'O(V!)', desc: 'Trying all possible paths.' },
      optimal: { time: 'O(V + E)', desc: 'Standard BFS/DFS traversal explores each vertex and edge once.' }
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/6n-graf.svg/500px-6n-graf.svg.png',
    codeSnippet: `// C++: Number of Islands (DFS)
void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] == '0')
        return;
    
    grid[r][c] = '0'; // mark visited
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int r = 0; r < grid.size(); r++) {
        for (int c = 0; c < grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                dfs(grid, r, c);
                count++;
            }
        }
    }
    return count;
}`,
    variations: 'Matrix DFS/BFS, Adjacency Lists, Union-Find, Dijkstra, Topological Sort.',
    problems: {
      basic: [{ name: 'Flood Fill', link: 'https://leetcode.com/problems/flood-fill/' }],
      medium: [{ name: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands/' }],
      hard: [{ name: 'Word Ladder', link: 'https://leetcode.com/problems/word-ladder/' }]
    }
  },
  '1d-dp': {
    title: '1-D Dynamic Programming',
    introduction: '1-Dimensional Dynamic Programming involves solving problems by breaking them down into smaller overlapping subproblems that can be represented in a 1D array.',
    useCases: [
      { text: 'Finding maximum/minimum paths along a linear sequence.', keyword: 'linear sequence' },
      { text: 'Climbing stairs or jumping games.', keyword: 'jump' }
    ],
    complexity: {
      bruteForce: { time: 'O(2^N)', desc: 'Pure recursion evaluates branches repeatedly.' },
      optimal: { time: 'O(N) Time, O(1) Space', desc: 'Storing just the last 2 states reduces time to O(N).' }
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Shortest_path_DP.svg/800px-Shortest_path_DP.svg.png',
    codeSnippet: `// C++: Climbing Stairs
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`,
    variations: 'Take or Not Take (House Robber), Palindrome checking, Decoding ways.',
    problems: {
      basic: [{ name: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs/' }],
      medium: [{ name: 'House Robber', link: 'https://leetcode.com/problems/house-robber/' }],
      hard: [{ name: 'Decode Ways', link: 'https://leetcode.com/problems/decode-ways/' }]
    }
  }
};

const allTopics = ['linked-list', 'tries', 'heap', 'backtracking', 'intervals', 'greedy', 'advanced-graphs', '2d-dp', 'bit-manipulation', 'math-and-geometry'];

allTopics.forEach(topic => {
  if (!dsaTopics[topic]) {
    dsaTopics[topic] = {
      title: topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      introduction: `This is a comprehensive guide for ${topic}. Understanding this topic is critical for mastering advanced algorithmic problem solving.`,
      useCases: [{ text: 'Standard algorithmic application of this pattern.', keyword: 'standard' }],
      complexity: {
        bruteForce: { time: 'O(N^2) or O(N!)', desc: 'A naive approach evaluates all possibilities.' },
        optimal: { time: 'O(N) or O(N log N)', desc: 'Applying this algorithmic pattern yields optimal bounds.' }
      },
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Merge_sort_algorithm_diagram.svg/300px-Merge_sort_algorithm_diagram.svg.png',
      codeSnippet: `// Standard algorithm template for ${topic}
void solve() {
    // Coming soon! Codeforces Tracker is expanding its DSA library.
}`,
      variations: `Questions in ${topic} generally fall into a few core patterns.`,
      problems: {
        basic: [{ name: 'Introductory Problems', link: '#' }],
        medium: [{ name: 'Pattern Recognition', link: '#' }],
        hard: [{ name: 'Advanced optimizations', link: '#' }]
      }
    };
  }
});
