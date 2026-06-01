import '../App.css';

export default function Guides() {
  return (
    <div className="container">
      <header>
        <h1>Competitive Programming Guides</h1>
        <p style={{ color: 'var(--text-muted)' }}>Master algorithms, data structures, and contest strategy with our in-depth articles.</p>
      </header>

      <div className="cards-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <article className="card text-page">
          <h2>How to Reach Candidate Master on Codeforces</h2>
          <p className="article-meta">Published on June 1, 2026 • 8 min read</p>
          
          <h3>1. Understand the Rating System</h3>
          <p>
            Reaching Candidate Master (rating 1900+) on Codeforces is a significant milestone that places you among the top competitive programmers globally. 
            The journey from Expert (1600-1899) to Candidate Master requires a shift in how you practice and approach contests. 
            At this level, you can no longer rely solely on implementation speed; you must develop a deep understanding of complex algorithms and mathematical proofs.
          </p>

          <h3>2. Master Essential Algorithms and Data Structures</h3>
          <p>
            To consistently solve problems at the C, D, and E levels in Div. 2 contests, your toolkit must expand. You should be intimately familiar with:
          </p>
          <ul>
            <li><strong>Graph Theory:</strong> Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's Algorithm, Minimum Spanning Trees (Kruskal/Prim), and Strongly Connected Components.</li>
            <li><strong>Dynamic Programming:</strong> Knapsack, Digit DP, DP on Trees, and Bitmask DP.</li>
            <li><strong>Advanced Data Structures:</strong> Segment Trees (with Lazy Propagation), Fenwick Trees (Binary Indexed Trees), Disjoint Set Union (DSU), and Trie.</li>
            <li><strong>Mathematics and Number Theory:</strong> Modular Arithmetic, Sieve of Eratosthenes, Combinatorics (nCr % p), and Fast Fourier Transform (FFT).</li>
          </ul>

          <h3>3. Strategic Practice via Upsolving</h3>
          <p>
            The secret to rapid improvement is <em>upsolving</em>. After every contest, you should attempt to solve at least one problem that you couldn't solve during the actual contest. 
            If you were stuck on problem C, spend 2-3 hours thinking about it before reading the editorial. 
            Reading editorials is an art: read just enough to get a hint, then try to code the solution yourself. Never copy-paste editorial code.
          </p>

          <h3>4. Time Management During Contests</h3>
          <p>
            A common pitfall for aspiring Candidate Masters is getting stuck on a mathematically heavy problem B while an easier graph problem C is waiting. 
            Always read all problems up to D within the first 30 minutes. If a problem seems implementation-heavy and error-prone, consider if another problem has a cleaner mathematical observation.
            Use our <strong>Codeforces Tracker</strong> to analyze your time-to-solve metrics and identify if you are spending too much time debugging easy problems.
          </p>

          <h3>5. Consistency and Mental Fortitude</h3>
          <p>
            Rating fluctuations are normal. You might drop 100 points in a bad contest. The key is to view rating as a trailing indicator of your skill, not your actual skill level. 
            Focus on increasing the difficulty of problems you can solve rather than stressing over rating points. Participate in virtual contests to simulate the pressure without the rating anxiety.
          </p>
        </article>

        <article className="card text-page">
          <h2>The Ultimate Guide to Dynamic Programming</h2>
          <p className="article-meta">Published on May 25, 2026 • 12 min read</p>
          
          <h3>Demystifying DP</h3>
          <p>
            Dynamic Programming (DP) is often the most feared topic for beginners. However, once it "clicks," it becomes an incredibly powerful tool. 
            At its core, DP is just an optimization over plain recursion. Whenever you see a problem asking for the "minimum/maximum cost," "number of ways," or "is it possible to achieve X," DP should be one of your first thoughts.
          </p>

          <h3>State Definition and Transitions</h3>
          <p>
            The most crucial step in any DP problem is defining the <em>state</em>. A state represents a subproblem. 
            For example, in the classic Knapsack problem, the state `dp[i][w]` represents the maximum value achievable using a subset of the first `i` items, such that the total weight is exactly `w`.
            Once the state is defined, you must formulate the <em>transition</em>: how does the current state depend on smaller, previously computed states?
            In our example, `dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i])`.
          </p>

          <h3>Common DP Patterns in Codeforces</h3>
          <ul>
            <li><strong>Prefix DP:</strong> Computing properties over prefixes of arrays. Extremely common in Div. 2 A and B problems.</li>
            <li><strong>DP on Trees:</strong> Usually involves a post-order traversal (DFS). You compute answers for subtrees and combine them to get the answer for the parent node.</li>
            <li><strong>Bitmask DP:</strong> Used when the constraints (N) are very small (typically N &le; 20). The state is represented as a bitmask where the i-th bit denotes whether the i-th item is included.</li>
          </ul>
          
          <h3>Practicing DP</h3>
          <p>
            The only way to get better at DP is volume. Start with the classic AtCoder Educational DP Contest. It covers all the fundamental patterns. 
            Once you are comfortable, use our platform's <strong>Latest Problems</strong> tab to filter by the 'dp' tag and practice problems in the 1400-1800 rating range.
          </p>
        </article>
      </div>
    </div>
  );
}
