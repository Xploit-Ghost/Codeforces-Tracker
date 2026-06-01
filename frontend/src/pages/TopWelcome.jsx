import React from 'react';
import '../App.css';

export default function TopWelcome() {
  return (
    <div className="container">
      <div className="card text-page" style={{ maxWidth: '1200px', width: '100%', padding: '3rem' }}>
        <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2.5rem', textShadow: '0 0 20px rgba(43, 179, 167, 0.4)' }}>
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

      </div>
    </div>
  );
}
