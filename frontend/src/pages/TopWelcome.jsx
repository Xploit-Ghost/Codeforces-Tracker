import React from 'react';
import '../App.css';

export default function TopWelcome() {
  return (
    <div className="container">
      <div className="card text-page" style={{ maxWidth: '1200px', width: '100%', padding: '3rem' }}>
        <h1 className="hero-heading">
          Welcome to Competitive Programming
        </h1>

        <section style={{ marginBottom: '3rem' }}>
          <h2>What is Competitive Programming?</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            Competitive programming is a mind sport usually held over the internet or a local network, involving participants trying to program according to provided specifications. Contestants are referred to as sport programmers. Competitive programming is recognized and supported by several multinational software and Internet companies, such as Google and Facebook.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            It involves solving logical and mathematical puzzles using algorithms and data structures within a strict time limit. It’s not just about writing code; it’s about writing <em>efficient</em> code that executes within milliseconds and handles massive edge cases flawlessly.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>How to Get Started?</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            Starting out can feel overwhelming, but the path is well-defined. Here are the core steps:
          </p>
          <ul style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            <li><strong>Learn a Language:</strong> C++ is the industry standard due to its speed and the Standard Template Library (STL). Java and Python are also acceptable but may face time limit issues on stricter problems.</li>
            <li><strong>Learn Basic Data Structures:</strong> Arrays, Strings, Linked Lists, Stacks, Queues.</li>
            <li><strong>Learn Basic Algorithms:</strong> Sorting, Binary Search, Basic Math (GCD, Primes).</li>
            <li><strong>Practice Consistently:</strong> Solve problems slightly above your comfort zone.</li>
            <li><strong>Participate in Contests:</strong> The only way to handle contest pressure is to experience it. Do virtual contests regularly.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Platform Registration Guides</h2>
          
          <h3>1. Codeforces</h3>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            Codeforces is the holy grail of competitive programming. It hosts regular contests (Div 1, 2, 3, 4) and has a sophisticated rating system.
          </p>
          <ul style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            <li>Go to <a href="https://codeforces.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Codeforces.com</a>.</li>
            <li>Click on "Register" in the top right corner.</li>
            <li>Choose a handle (this will be your identity, choose wisely!), email, and password.</li>
            <li>Verify your email and you are ready to participate in your first Div 4 or Div 3 round!</li>
          </ul>

          <h3>2. LeetCode</h3>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            LeetCode is primarily used for interview preparation, but their weekly contests are a great way to practice speed and accuracy.
          </p>
          <ul style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            <li>Visit <a href="https://leetcode.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>LeetCode.com</a>.</li>
            <li>Click "Create Account".</li>
            <li>Once registered, head over to the "Problems" tab to start solving, or the "Contest" tab to register for the weekend rounds.</li>
          </ul>

          <h3>3. TakeYouForward (Striver)</h3>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            Created by Raj Vikramaditya (Striver), this is arguably the best resource for learning DSA from scratch in India and globally.
          </p>
          <ul style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            <li>Visit <a href="https://takeuforward.org" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>takeuforward.org</a>.</li>
            <li>Check out the famous Striver's A-Z DSA Sheet, which provides a structured curriculum from basics to advanced graphs and DP.</li>
            <li>You can also follow his YouTube playlist: <a href="https://www.youtube.com/c/takeUforward" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Striver A-Z Playlist</a> for detailed video explanations of every concept.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Understanding Algorithmic Paradigms</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            As you begin solving problems, you will encounter various algorithmic paradigms. These are general approaches or strategies for designing algorithms. Understanding these is crucial for identifying the correct solution path during a contest.
          </p>
          <ul style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            <li><strong>Greedy Algorithms:</strong> A paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. It's often used for optimization problems.</li>
            <li><strong>Dynamic Programming (DP):</strong> A method for solving complex problems by breaking them down into simpler subproblems. It is applicable when the subproblems overlap, allowing you to store and reuse their solutions (memoization or tabulation).</li>
            <li><strong>Divide and Conquer:</strong> This technique involves dividing a problem into smaller, non-overlapping subproblems, solving them recursively, and then combining their solutions to solve the original problem. Merge Sort and Quick Sort are classic examples.</li>
            <li><strong>Backtracking:</strong> An algorithmic-technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem.</li>
          </ul>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            Mastering these paradigms requires practice. Don't just memorize implementations; focus on understanding *why* a particular paradigm works for a specific problem.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>The Importance of Time and Space Complexity</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            In competitive programming, getting the right answer isn't enough; you must get it within the allotted time (usually 1-2 seconds) and memory limits (usually 256MB). This introduces the concept of Big O notation.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            Big O notation mathematically describes the complexity of your algorithm. For example, an `O(N^2)` algorithm will easily run within 1 second for `N = 1000`, but will yield a Time Limit Exceeded (TLE) verdict for `N = 10^5`.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            A general rule of thumb in modern competitive programming is that a standard server can perform roughly `10^8` operations per second. Therefore, if your constraints specify `N = 10^5`, an `O(N)` or `O(N log N)` solution is expected. Always analyze your algorithm's worst-case time complexity before writing the first line of code.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Debugging and Upsolving</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            You will face Wrong Answer (WA), Time Limit Exceeded (TLE), and Runtime Error (RTE) verdicts frequently. How you handle them defines your growth rate.
          </p>
          <ul style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            <li><strong>Debugging:</strong> Avoid relying solely on IDE debuggers. Learn to trace your code mentally or use strategic print statements. Write edge cases on paper. What happens if `N=1`? What if all elements are negative? What if the graph is a star graph or a straight line?</li>
            <li><strong>Upsolving:</strong> Upsolving is the practice of solving problems *after* a contest ends, specifically the ones you couldn't solve during the live round. This is the absolute fastest way to increase your rating. If you can solve 2 problems in a contest, you must strive to upsolve the 3rd problem afterwards.</li>
          </ul>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
            Remember, competitive programming is a marathon, not a sprint. The learning curve is steep initially, but consistency will yield incredible results.
          </p>
        </section>

      </div>
    </div>
  );
}
