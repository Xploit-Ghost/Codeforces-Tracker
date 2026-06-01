import React from 'react';
import '../App.css';

export default function CodeforcesWelcome() {
  return (
    <div className="container">
      <div className="card text-page" style={{ maxWidth: '900px', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem', textShadow: '0 0 20px rgba(43, 179, 167, 0.4)' }}>
          WELCOME TO CP-Tracker Codeforces Section !
        </h1>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Introduction to the Codeforces Section</h2>
          <p>
            Welcome to the beating heart of CP-Tracker! The Codeforces Section is a meticulously crafted suite of tools 
            designed specifically to elevate your competitive programming journey. Whether you are a complete beginner aiming 
            to solve your first Div 3 A problem, or a seasoned Candidate Master pushing for Grandmaster, this section will 
            be your daily companion. 
          </p>
          <p>
            We have integrated deeply with the official Codeforces API to bring you an unparalleled experience in discovering, 
            analyzing, and mastering algorithmic challenges. The traditional Codeforces interface is highly functional, but 
            navigating the sheer volume of problems (over 9,000+ challenges) can be daunting. CP-Tracker changes the paradigm 
            by offering an intelligent layer on top of the vast problemset.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>What This Section Includes</h2>
          <p>
            This section is designed to be an end-to-end ecosystem for competitive programmers. Here is a detailed breakdown 
            of the functionalities you can expect to find (both currently active and upcoming features).
          </p>

          <h3>1. Program Solving Ecosystem</h3>
          <p>
            At the core of any CP platform is the actual solving of problems. Our Program Solving Ecosystem is built to ensure 
            that you are spending your time writing code, not searching for what to solve. 
          </p>
          <ul>
            <li><strong>Curated Problem Paths:</strong> We analyze your current rating and generate a localized path of problems. You won't just solve random problems; you will solve problems that are statistically proven to increase your rating.</li>
            <li><strong>Blind Mode Solving:</strong> A specialized toggle that hides problem tags and difficulty ratings until you have solved the problem. This mimics a real contest environment where you don't know if a problem is a greedy approach or dynamic programming just by looking at it.</li>
            <li><strong>Editorial Insights:</strong> Struggling with a problem? We provide intelligent hints before revealing the full editorial, helping you bridge the gap in your logic without giving away the complete solution.</li>
          </ul>

          <h3>2. Question Finding Engine</h3>
          <p>
            The sheer volume of problems on Codeforces is a double-edged sword. It's great to have options, but finding the 
            <em>right</em> option is tedious. 
          </p>
          <ul>
            <li><strong>Granular Topic Sorting:</strong> Jump into the "Problems Sorted by Topics" tab. Here you can pinpoint exactly what you want to practice. Want to practice 'Bitmask DP' between 1600 and 1800 rating? You can filter for that instantly.</li>
            <li><strong>Anti-Duplication Filters:</strong> Our engine cross-references your Codeforces handle (if provided) to ensure you are never recommended a problem you have already attempted or solved in the past.</li>
            <li><strong>Trending Contest Problems:</strong> See which problems from the most recent rounds have the highest solve rates, indicating they contain standard tricks or educational concepts.</li>
          </ul>

          <h3>3. Code Running Functionality (Coming Soon)</h3>
          <p>
            Currently, CP-Tracker serves as an analytical and discovery frontend. However, we are in the active development 
            stage of integrating an onboard, sandboxed Code Running functionality.
          </p>
          <p>
            <strong>What to expect:</strong>
          </p>
          <ul>
            <li><strong>In-Browser IDE:</strong> A fully-fledged code editor featuring syntax highlighting for C++, Python, Java, and Rust. It will include Vim/Emacs keybindings for power users.</li>
            <li><strong>Custom Test Cases:</strong> You will be able to write and execute custom test cases directly within CP-Tracker before submitting them to Codeforces.</li>
            <li><strong>Stress Testing Module:</strong> An automated script runner where you can provide a brute-force solution, your optimized solution, and a test-case generator. The module will automatically run until it finds a mismatch, saving you hours of manual debugging during virtual contests.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>The Philosophy of Practice</h2>
          <p>
            To make the most out of the Codeforces Section, it is imperative to understand the philosophy of effective 
            competitive programming practice. Grinding hundreds of problems below your rating level will only reinforce 
            what you already know. 
          </p>
          <p>
            <strong>The "+200 Rule":</strong> The optimal practice zone is solving problems that are exactly 100 to 200 points 
            above your current Codeforces rating. If you are rated 1400, your sweet spot is the 1500-1600 range. Our Question 
            Finding Engine is specifically tuned for this methodology. It will automatically suggest parameters that push you 
            slightly out of your comfort zone.
          </p>
          <p>
            <strong>Upsolving:</strong> We strongly encourage the practice of 'upsolving' — returning to contests you participated 
            in and solving the problem you were stuck on. The Codeforces Section will soon feature an 'Upsolve Tracker' to 
            remind you of pending problems from your recent rounds.
          </p>
        </section>

        <section>
          <h2>Navigating Forward</h2>
          <p>
            To begin, explore the <strong>Problems Sorted by Topics</strong> tab. Use the granular rating dropdowns and topic 
            selectors to generate a custom worksheet of problems tailored to your immediate learning goals. 
          </p>
          <p>
            Remember, competitive programming is a marathon, not a sprint. Consistency, strategic practice, and the right tools 
            will inevitably lead to rating growth. Welcome to the CP-Tracker family. Let's start building your algorithm mastery today!
          </p>
        </section>
      </div>
    </div>
  );
}
